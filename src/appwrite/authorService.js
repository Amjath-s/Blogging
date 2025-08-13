import { Client, Databases, Storage, ID,Query } from "appwrite";
import config from "../conf/config";

export class AuthorService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async postAuthorInfo({ name, about, avatar, userId, interest}) {
    try {
      return await this.databases.upsertDocument(
        config.appwriteDatabaseId,
        config.appwriteAuthorCollectionId,
        userId,
        {
          AUTHORNAME: name,
          AVATAR: avatar,
          ABOUT: about,
          USERID: userId,
          INTEREST: interest,
        }
      );
    } catch (error) {
      console.error("Error in creating author info:", error);
      throw error; // Re-throw the error so it can be handled in the component
    }
  }
  // async getAuthroInfo(userId)
  // {
  //     try {
          
      
  //         return await this.databases.getDocument(
  //             config.appwriteDatabaseId,
  //             config.appwriteAuthorCollectionId,
  //             userId
          
  //         )
  //     }
  //     catch (error)
  //     {
  //         throw error
  //         console.log(error)
  //     }
  
  // }

  async getAuthorInfo({USERID: userId })
  {
    return await this.databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteAuthorCollectionId,
      [Query.equal("USERID", [userId])]
    );

  }
}


const authorService = new AuthorService();
export default authorService;
