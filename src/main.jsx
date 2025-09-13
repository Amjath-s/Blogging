import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Home from "./Pages/Home.jsx";
import Editpost from "./Pages/Editpost.jsx";
import Post from "./Pages/Post.jsx";
import Authlayout from "./component/AuthLayout.jsx";
import Addpost from "./Pages/AddPost.jsx";
import Profile from "./Pages/Profile.jsx";
import AuthorInfo from "./Pages/AuthorInfo.jsx";
import Tagpost from "./Pages/Tagpost.jsx";
import ProfileForm from "./component/ProfileForm.jsx";
import UserPost from "./Pages/UserPost.jsx";
import Landingpage from "./Pages/Landingpage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      
      {
        path: "/login",
        element: (
          <Authlayout authentication={false}>
            <LoginPage />
          </Authlayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <Authlayout authentication={false}>
            <Signup />
          </Authlayout>
        ),
      },
     
      {
        path: "/add-post",
        element: (
          <Authlayout authentication={true}>
            <Addpost />
          </Authlayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Authlayout authentication={true}>
            <Editpost />
          </Authlayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <Authlayout authentication>
            <Profile />,

          </Authlayout>  
        ),
        children: [
          {
            path: "/profile",
            element: <ProfileForm />,
          },
          {
            path: "/profile/posts",
            element: <UserPost />,
          },
        
          
        ]

      },
      {
        path: "/author/:userid",
        element: (
          < Authlayout authentication>
            <AuthorInfo/>
         </Authlayout>
        )
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/tag/:tag",
        element: (
          <Authlayout authentication>
            <Tagpost />
          </Authlayout>
        ),
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </StrictMode>
);
