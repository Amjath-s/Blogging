const config = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteAuthorCollectionId: String(
    import.meta.env.VITE_APPWRITE_USERINFO_BUCKET_ID
  ),
  appwriteUserFollow:String(import.meta.env.VITE_APPWRITE_USERFOLLOWERS),
  appwriteComments: String(import.meta.env.VITE_APPWRITE_COMMENTS),
  appwriteLikesId:String(import.meta.env.VITE_APPWRITE_LIKES)
};
export default config;
