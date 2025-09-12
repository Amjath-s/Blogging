import { useEffect, useState } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";
import { Header, Footer } from "./component/index.js";
import { Outlet } from "react-router-dom";
import { logout } from "./store/authSlice";
import appwriteauth from "./appwrite/authorService.js"

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        console.log("userData", userData);
        if (userData) {
          dispatch(login(userData),
          appwriteauth.ensureAuthor({ user: userData })
          
          
          
          
          );
        } else {
          console.log("No user data found, dispatching logout");
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-blue-600"
          role="status"
        >
          <span className="sr-only">Loading....</span>
        </div>
      </div>
    );
  }

  // Show main app after authentication check is complete
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="grow pt-13 min-h-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
