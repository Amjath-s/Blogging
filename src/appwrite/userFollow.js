import { Client,Databases, ID, Query } from "appwrite"
import config from "../conf/config"
export class userFollow {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
  }
  async putUserFollow({ userFollower, userFollowee }) {
    console.log("userFollower:", userFollower);
    console.log("userFollowee:", userFollowee);
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteUserFollow,
        ID.unique(),

        {
          USERFOLLOWER: userFollower,
          USERFOLLOWEE: userFollowee,
        }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async checkFollow({ userFollower, userFollowee }) {
    console.log("cheching following is running");
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteUserFollow,
        [
          Query.equal("USERFOLLOWER", userFollower),
          Query.equal("USERFOLLOWEE", userFollowee),
        ]
      );
    } catch (error) {
      throw error;
      console.log(error);
    }
  }

  //   async deleteUserFollow({ userFollower, userFollowee }) {
  //     try {
  //       const doc = await this.database.listDocuments(
  //         config.appwriteDatabaseId,
  //         config.appwriteUserFollow,
  //         [
  //           Query.equal("USERFOLLOWER", userFollower),
  //           Query.equal("USERFOLLOWEE", userFollowee),
  //         ]
  //       );

  //       return await this.database.deleteDocument(
  //         config.appwriteDatabaseId,
  //         config.appwriteUserFollow,
  //         doc.documents[0].$id
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  async deleteUserFollow({ userFollower, userFollowee }) {
    try {
      const doc = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteUserFollow,
        [
          Query.equal("USERFOLLOWER", userFollower),
          Query.equal("USERFOLLOWEE", userFollowee),
        ]
      );

      if (!doc.documents || doc.documents.length === 0) {
        // No matching follow document exists — nothing to delete.
        return null;
      }

      return await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteUserFollow,
        doc.documents[0].$id
      );
    } catch (error) {
      console.error("Error deleting follow document:", error);
      throw error;
    }
  }

  async getUserFollowingCount({ userId }) {
    try {
      const following = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteUserFollow,
        [Query.equal("USERFOLLOWER",
          userId)]
      );
      if (!following.documents || following.documents.length === 0)   
      {
        return 0
        
      }
      else {
        return following.total
      }
    }
    catch (error)
    {
      throw error
    }
    
  }
  async getUserFollowerCount({userId})
  {
    try {
      const followers = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteUserFollow,
        [Query.equal("USERFOLLOWEE",
          userId)]
        
      )
      if (!followers.documents || followers.documents.length === 0)
      {
        return 0
      }
      return followers.total
    }
    catch (error)
    {
      console.log("error in the folowercount ",error)
    }
  }
    

  
}

const userfollowservice= new userFollow()
export default userfollowservice
