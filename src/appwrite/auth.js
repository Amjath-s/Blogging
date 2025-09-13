import { use } from "react";
import config from "../conf/config";
import authorService from "./authorService";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createUser({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method
        return this.login({ email, password });
      } else {
        return userAccount;
        console.log("useaccount", userAccount);
      }
    } catch (error) {
      throw error;
      console.error(error.error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error.message.includes("missing scope (account)")) {
        return null;
      }
      console.error("Appwrite service :: getCurrentUser :: error", error);
      return null;
    }
  }
  async logout() {
    try {
      // Get current session first
      const session = await this.account.getSession("current");
      if (session) {
        return await this.account.deleteSession("current");
      }
      return true; // No session to delete
    } catch (error) {
      // If there's no session or any other error, just return true
      console.log("No active session to delete or error:", error);
      return true;
    }
  }
    async loginWithGoogle(redirectUrl = window.location.origin) {
      console.log("this thingis wokring or not ")
      try { 
        // This will redirect the user to Google for authentication
        return await this.account.createOAuth2Session(
          "google",
          "http://localhost:5173/", // Success redirect URL
          "http://localhost:5173/" // Failure redirect URL
        )
  

        
      } catch (error) { 
        throw error;
      }
    }
  
}

const authService = new AuthService();
export default authService;
