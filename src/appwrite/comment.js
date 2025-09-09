import { Client, Databases,ID, Query } from 'appwrite'
import React from 'react'
import config from '../conf/config'

export class CommentService {
  client = new Client();
  // realtime= new thisrealtime
  database;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async commentPost({
    content,
    parentcommentId = null,
    postId,
    userId,
    userName,
  }) {
   
    return await this.database.createDocument(
      config.appwriteDatabaseId,
      config.appwriteComments,
      ID.unique(),

      {
        POSTID: postId,
        COMMENT: content,
        PARENTCOMMENTID: parentcommentId,
        USERID: userId,
        USERNAME: userName,
      }
    );
    
  }

  async fetchComment({ postId }) {
    return await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteComments,
      [Query.equal("POSTID", postId), Query.orderDesc("$createdAt")]
    );
  }
  async deleteComment({ commentId }) {
    try {
      const replies = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteComments,
          [Query.equal("PARENTCOMMENTID", commentId)
            
              
              
        ]
      );

      for (const reply of replies.documents) {
        await this.deleteComment({ commentId: reply.$id });
      }

      return await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteComments,
        commentId
      );
     
    } catch (error) {
      console.log(error);
    }
  }



    realTimeComment({ postId, setComment }) {
        console.log("working of realtime");
        return this.client.subscribe(
   
          `databases.${config.appwriteDatabaseId}.collections.${config.appwriteComments}.documents`,
          (response) => {
             console.log("REALTIME EVENT:", response);
             const { events, payload: comment } = response;


            if (comment.POSTID !== postId) return; // correctly early return

            if (events.some((e) => e.endsWith(".create"))) {
              setComment((prev) => [comment,...(prev || [])]);
            } else if (events.some((e) => e.endsWith(".delete"))) {
              setComment((prev) =>
                (prev || []).filter((c) => c.$id !== comment.$id)
              );
            } else if (events.some((e) => e.endsWith(".update"))) {
              setComment((prev) =>
                (prev || []).map((c) => (c.$id === comment.$id ? comment : c))
              );
            }
          }
        );
    }
    
}
const commentservice = new CommentService()
export default commentservice