import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index";
import appwriteService from "../appwrite/store";
import authService from "../appwrite/auth";
import appwriteAuthservice from "../appwrite/authorService";
import  appwriteUserfollow from "../appwrite/userFollow"

function ProfileForm() {
  const { register, handleSubmit, watch, reset } = useForm();
  const [userId, setUserId] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [authorValue, setAuthorValue] = useState(null);
  const [disable, setDisable] = useState(true);
  const [userinfo, setUserInfo] = useState()
  const [tagline, setTagLine] = useState()
  const [followingcount, setFollowingCount] = useState()
  const [loading, setLoading] = useState(true)
  const [followercount,SetFollowerCount]=useState()

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      setUserId(userData.$id);
      setUserInfo(userData)
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    appwriteAuthservice
      .getAuthorInfo({ USERID: userId })
      .then((data) => {
        if (data?.documents?.length > 0) {
          setAuthorValue(data.documents[0]);
          reset({
            authorname: data.documents[0].AUTHORNAME || "",
            tagline: data.documents[0].TAGLINE || "",
            interest: data.documents[0].INTEREST || "",
            about: data.documents[0].ABOUT || "",
            profileurl: data.documents[0].PROFILEURL || "",
            twitter: data.documents[0].TWITTER || "",
            email: data.documents[0].EMAIL || "",
            image:data.documents[0].AVATAER||"",

            profession: data.documents[0].PROFESSION || "",

            twitterurl: data.documents[0].TWITTERURL || "",
          });
          setDisable(true);
          setTagLine(data.documents[0].TAGLINE)
          setLoading(false)
        } else {
          setAuthorValue(null);
          reset({
            authorname:"",
  
            tagline: "",
            interest: "",
            about: "",
            profileurl: "",
            twitterurl: "",
            email:"",
            profession: "",
         
          });
          setDisable(false);

        }
      })
      .catch(() => {
        reset({});
        setDisable(false);
      });
  }, [userId, reset]);

   useEffect(() =>
  {
    if (!userId) return

    appwriteUserfollow.getUserFollowingCount ( { userId }).then(res =>
    {

      setFollowingCount(res)
    }
    
    
  )
  appwriteUserfollow.getUserFollowerCount({ userId }).then(res =>
  {
    SetFollowerCount(res);

  }
  )
     



  })










  const submitInfo = async (data) => {
    const file = data.image?.[0]
      ? await appwriteService.uplaodFile(data.image[0])
      : null;
    const fileId = file ? file.$id : null;


    const authInfo = await appwriteAuthservice.postAuthorInfo({
      ...data,
      avatar: fileId,
      userId: userId,
      // authorname: userinfo?.name,
      // email:userinfo?.email
    });
    setDocumentId(authInfo.$id);
    setDisable(true);
    setAuthorValue(data);
    reset(data);
  };

  const imageFile = watch("image");


  if (loading)
  {
    return (
      <>
        <div className="flex justify-center items-center h-screen w-full">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-blue-600"
            role="status"
          >
            <span className="sr-only">Loading....</span>
          </div>
        </div>
      </>
    );
        }
  return (
    <>
      <div className="flex flex-col bg-orange-300 m-4 sm:m-10 h-fit gap-10 w-full p-4 sm:p-6">
        {/* Top Section */}
        <div className="w-full flex flex-col xl:flex-row lg:flex=col items-center gap-6">
          {/* Avatar */}
          <div className="h-28 w-28 rounded-full border border-gray-300 overflow-hidden bg-gray-100">
            {imageFile && imageFile.length > 0 ? (
              <img
                src={URL.createObjectURL(imageFile[0])}
                alt="Avatar Preview"
                className="h-full w-full object-cover"
              />
            ) :
              authorValue?.AVATAR ? (
              <img
                src={appwriteService.getFileUrl(authorValue.AVATAR)}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-5xl flex items-center justify-center h-full">
                👤
              </span>
            )}
          </div>

          {/* Name + Stats */}
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-6">
            {/* Name + Tagline */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center w-full lg:w-1/3">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {userinfo?.name || "Your Name"}
              </h1>
              <p className="text-sm text-gray-500 mt-2 italic">
                {tagline || "Write a short tagline about yourself"}
              </p>
            </div>

            {/* Followers / Following */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-4 sm:p-2 rounded-xl shadow-sm border border-gray-200 w-full md:w-2/3  lg:w-1/3 justify-around">
              <div className="flex flex-col items-center">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Followers
                </h2>
                <span className="text-xl  font-bold text-gray-900 mt-1 ">
                  {followercount}
                </span>
              </div>

              {/* <div className="hidden w-px bg-gray-300 sm:h-10"></div> */}

              <div className="flex flex-col items-center">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Following
                </h2>
                <span className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                  {followingcount}
                </span>
              </div>
            </div>

            {/* <h3 className="texxt-center lg:text-left">links</h3> */}
            <div className="flex flex-wrap gap-4 text-sm mt-4 lg:flex-col">
              {authorValue?.EMAIL && (
                <a
                  href={`mailto:${authorValue.EMAIL}`}
                  className="text-blue-600 hover:underline"
                >
                  📧 {authorValue.EMAIL}
                </a>
              )}
              {authorValue?.PROFILEURL && (
                <a
                  href={authorValue.PROFILEURL}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  🌐 Profile
                </a>
              )}
              {authorValue?.TWITTERURL && (
                <a
                  href={authorValue.TWITTERURL}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  🐦 Twitter
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full">
          <form onSubmit={handleSubmit(submitInfo)}>
            <div className="grid gap-6 mb-6 grid-cols-1 md:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your tag line"
                  disabled={"True"}
                  {...register("authorname")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  disabled={true}
                  {...register("email")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              {/* Tagline */}
              <div>
                <label
                  htmlFor="tag_line"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Tag Line
                </label>
                <input
                  type="text"
                  id="tag_line"
                  placeholder="Enter your tag line"
                  disabled={disable}
                  {...register("tagline")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              {/* About */}
              <div>
                <label
                  htmlFor="about"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  About
                </label>
                <input
                  type="text"
                  id="about"
                  placeholder="About"
                  disabled={disable}
                  {...register("about")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              {/* Profession */}
              <div>
                <label
                  htmlFor="profession"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Profession
                </label>
                <input
                  type="text"
                  id="profession"
                  disabled={disable}
                  placeholder="Enter your profession"
                  {...register("profession")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              {/* Interest */}
              <div>
                <label
                  htmlFor="interest"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Interest
                </label>
                <input
                  type="text"
                  id="interest"
                  disabled={disable}
                  placeholder="Enter your field of interest"
                  {...register("interest")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              {/* Profile URL */}
              <div>
                <label
                  htmlFor="websiteurl"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  PROFILE URL
                </label>
                <input
                  type="url"
                  id="websiteurl"
                  placeholder="flowbite.com"
                  disabled={disable}
                  {...register("profileurl")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              {/* Twitter URL */}
              <div>
                <label
                  htmlFor="twitterurl"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Twitter Url
                </label>
                <input
                  type="url"
                  id="twitterurl"
                  disabled={disable}
                  placeholder="Twitter url"
                  {...register("twitterurl")}
                  className={
                    disable
                      ? " bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5 w-full"
                      : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  }
                />
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label
                htmlFor="file"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                File
              </label>
              <input
                type="file"
                id="file"
                disabled={disable}
                accept="image/png, image/jpg, image/jpeg"
                placeholder="Upload Avatar"
                {...register("image")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            {/* Buttons */}
            <div className="pt-4 flex justify-end">
              {!disable ? (
                <Button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
                >
                  Save Profile
                </Button>
              ) : (
                <button
                  type="button"
                  onClick={() => setDisable(false)}
                  className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );






}

export default ProfileForm;
