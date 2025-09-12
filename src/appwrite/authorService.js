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
  async postAuthorInfo({ authorname,about,avatar,  userId, interest,profession,tagline,twitterurl,profileurl,email}) {
    try {
      return await this.databases.upsertDocument(
        config.appwriteDatabaseId,
        config.appwriteAuthorCollectionId,
        userId,
        {
          AUTHORNAME:authorname,
          AVATAR: avatar,
          ABOUT: about,
          USERID: userId,   
          INTEREST: interest,
          PROFESSION: profession,
          TAGLINE: tagline,
          PROFILEURL: profileurl,
          TWITTERURL: twitterurl,
          EMAIL:email
        }
      );
    } catch (error) {
      console.error("Error in creating author info:", error);
      throw error; // Re-throw the error so it can be handled in the component
    }
  }
  

  async getAuthorInfo({USERID: userId })
  {
    return await this.databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteAuthorCollectionId,
      [Query.equal("USERID", [userId])]
    );

  }
  async ensureAuthor({user})
  {
    console.log("the ensure author woking ")
    try {
      const author =  await this.getAuthorInfo({ USERID: user.$id })
      console.log("author",author)
      if (!author.documents.length)
      {
        console.log("the inside of if autro exusfre")
        await this.postAuthorInfo(
          {
            authorname: user.name,
            about: "",
            userId: user.$id,
            interest: "",
            profession: "",
            tagline: "",
            twitterurl: "",
            profileurl: "",
            email:user?.email||""
            

          
          }
        )

      }
      
    }
    catch (error)
    {
      throw error
    }
  }


}


const authorService = new AuthorService();
export default authorService;
