import { Client, ID, Databases, Account, Storage, Query } from "appwrite";
import config from "../conf/config.js";

export class StoreService {
  client = new Client();
  databases;
  bucket; //storage ig

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
    author,
    caption,
    tag,
    like,
  }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(), // Use slug as the document ID
        // If you want to use a custom ID, you can use ID.unique()

        {
          Author: author,
          Title: title,
          Content: content,
          FeaturedImage: featuredImage,
          Status: status,
          UserId: userId,
          userInfo: userId,
          Caption: caption,
          Tag: tag,
          LikedCount: like,
        }
      );
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, caption }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug, // Use slug as the document ID
        {
          Title: title,
          Content: content,
          FeaturedImage: featuredImage,
          Status: status,
          Caption: caption,
        }
      );
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug // Use slug as the document ID
      );
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug // Use slug as the document ID
      );
    } catch (error) {
      console.error("Error getting post:", error);
      throw error;
    }
  }
  // queries = [Query.equal("Status", "active")];
  async getPosts(limit = 5, cursor = null) {
    const queries = [
      Query.equal("Status", "active"),
      Query.limit(limit),
      Query.orderDesc("$createdAt"),
    ];
    if (cursor) {
      queries.push(Query.cursorAfter(cursor));
    }

    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Error getting posts:", error);
      throw error;
      return false;
    }
  }

  async fetchpost() {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId
      );
    } catch (error) {
      console.log("error in fetch all post", error);
    }
  }

  //file uplaod services

  async uplaodFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(), // Generate a unique ID for the file
        file
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileId // Use the file ID to delete the specific file
      );
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  getFileUrl(fileId) {
    return this.bucket.getFileView(config.appwriteBucketId, fileId);
  }
  //for likes

  async updateLikeCount(postId) {
    try {
      //counting post like
      const likelist = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteLikesId,
        [Query.equal("POSTID", postId)]
      );
      const likeCount = likelist.total;
      //updating like count in post table
      await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        postId, // Use slug as the document ID
        {
          LikedCount: likeCount,
        }
      );
      console.log("like count updated");
    } catch (error) {
      console.log("error in updating like count", error);
    }
  }



  async tredingpost(limit = 5) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [
          Query.equal("Status", "active"),
          Query.orderDesc("LikedCount"),
          Query.limit(limit),
        ]
      );
    } catch (error) {
      console.log("error in fetching trending post", error);
    }
  }

  async postLike({ postId, userId }) {
    console.log("postlike owrking");
    try {
      await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteLikesId,
        ID.unique(),
        {
          POSTID: postId,
          USERID: userId,
        }
      );
      console.log("like created");
      return this.updateLikeCount(postId);
    } catch (error) {
      console.log(error);
    }
  }

  async getLikes({ postId }) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteLikesId,
        [Query.equal("POSTID", postId)]
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteLike({ postId, userId }) {
    try {
      const resp = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteLikesId,
        [Query.equal("POSTID", postId), Query.equal("USERID", userId)]
      );
      if (resp.documents.length > 0) {
        const docId = resp.documents[0].$id;
        await this.database.deleteDocument(
          config.appwriteDatabaseId,
          config.appwriteLikesId,
          docId
        );
      }
      // Always update like count after delete attempt
      return await this.updateLikeCount(postId);
    } catch (error) {
      console.log("error in deleting", error);
    }
  }
}

const storeservice = new StoreService();
export default storeservice;
