const conf = {
    appwriteEndpoint: String(process.env.REACT_APP_APPWRITE_ENDPOINT),
    appwriteProjectId: String(process.env.REACT_APP_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.REACT_APP_APPWRITE_DATABASE_ID),

    QueriesCollectionId: String(process.env.REACT_APP_APPWRITE_QUERIES_COLLECTION_ID),
    CategoriesCollectionId: String(process.env.REACT_APP_APPWRITE_CATEGORIES_COLLECTION_ID),
    BlogsCollectionId: String(process.env.REACT_APP_APPWRITE_BLOGS_COLLECTION_ID),
    AdminsCollectionId: String(process.env.REACT_APP_APPWRITE_ADMINS_COLLECTION_ID),

    profilePictureBucketId: String(process.env.REACT_APP_APPWRITE_PROFILE_BUCKET_ID),
    BlogImagesBucketId: String(process.env.REACT_APP_APPWRITE_BLOGIMAGES_BUCKET_ID),
}

export default conf