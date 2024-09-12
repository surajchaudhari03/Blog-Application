import { account } from './AppwriteService';

const AuthService = {
  register: async (email, password, name) => {
    try {
      const response = await account.create('unique()', email, password, name);
      return response;
    } catch (error) {
      console.log("Appwrite serive :: register :: error", error);
    }
  },

  login: async (email, password) => {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      return response;
    } catch (error) {
      console.log("Appwrite serive :: login :: error", error);
    }
  },

  logout: async () => {
    try {
      const response = await account.deleteSession('current');
      return response;
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  },

  getCurrentUser: async () => {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      return null;
    }
  },

  //   Note: The "createRecovery" method's second parameter is the URL to which the user will be redirected after password recovery. Ensure this route exists in application.
  resetPassword: async (email) => {
    try {
      const response = await account.createRecovery(email, 'http://localhost/reset-password');
      return response;
    } catch (error) {
      throw error;
    }
  },

  updatePassword: async (password, token) => {
    try {
      const response = await account.updateRecovery(token, password);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
