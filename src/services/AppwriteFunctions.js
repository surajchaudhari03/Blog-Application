import { Query } from "appwrite";
import { databases } from "./AppwriteService";
import conf from "./conf";


const AppwriteFunctions = {
    listBlogs: async (setBlogs) => {
        try {
            const blogsResponse = await databases.listDocuments(
                conf.appwriteDatabaseId, 
                conf.BlogsCollectionId, 
                [Query.orderDesc('createdAt')]
            );
            setBlogs(blogsResponse.documents)
        } catch (error) {
            console.log("Appwrite serive :: list documents :: blogs", error);
        }
    },

    listCategories: async (setCategories) => {
        try {
            const categoriesResponse = await databases.listDocuments(
                conf.appwriteDatabaseId, 
                conf.CategoriesCollectionId
            );
            setCategories(categoriesResponse.documents);
        } catch (error) {
            console.log("Appwrite serive :: list documents :: categories", error);
        }
    }


}

export default AppwriteFunctions