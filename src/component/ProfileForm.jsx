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
  const [followers, setFollowers] = useState(254);
  const [following, setFollowing] = useState(189);
  const [userinfo, setUserInfo] = useState()
  const [tagline, setTagLine] = useState()
  const [followingcount,setFollowingCount]=useState()

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

    appwriteUserfollow.getUserFollowingCount({ userId }).then(res =>
    {

      setFollowingCount(res)
    }
    
  )
  console.log(authorValue)


  })










  const submitInfo = async (data) => {
    const file = data.image?.[0]
      ? await appwriteService.uplaodFile(data.image[0])
      : null;
    const fileId = file ? file.$id : null;
    console.log("   the file id ",fileId)

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

  // return (
  //   <div className="min-h-screen flex bg-gray-50">
  //     <div className="flex-1 flex flex-col items-center py-12 px-4 sm:px-8 lg:px-12">
  //       <div className="w-full max-w-4xl bg-white shadow-sm rounded-2xl border border-gray-200">
  //         {/* Profile Header */}
  //         <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
  //           <div className="flex items-center gap-6">
  //             <div className="relative">
  //               <div className="h-20 w-20 rounded-full border border-gray-300 overflow-hidden bg-gray-100">
  //                 {imageFile && imageFile.length > 0 ? (
  //                   <img
  //                     src={URL.createObjectURL(imageFile[0])}
  //                     alt="Avatar Preview"
  //                     className="h-full w-full object-cover"
  //                   />
  //                 ) : authorValue?.avatar ? (
  //                   <img
  //                     src={appwriteService.getFileUrl(authorValue.avatar)}
  //                     alt="Avatar"
  //                     className="h-full w-full object-cover"
  //                   />
  //                 ) : (
  //                   <span className="text-gray-400 text-5xl flex items-center justify-center h-full">
  //                     👤
  //                   </span>
  //                 )}
  //               </div>
  //               <Input
  //                 disabled={disable}
  //                 type="file"
  //                 accept="image/png, image/jpg, image/jpeg, image/gif"
  //                 className="absolute -bottom-2 -right-2 text-white p-1.5 rounded-full cursor-pointer shadow bg-indigo-600 hover:bg-indigo-700 transition border-2 border-white"
  //                 style={{ width: "40px", height: "40px", opacity: 1 }}
  //                 {...register("image")}
  //                 title="Change Avatar"
  //               />
  //             </div>
  //             <div>
  //               <h2 className="text-xl font-semibold text-gray-900">
  //                 {authorValue?.AUTHORNAME || "Your Name"}
  //               </h2>
  //               <p className="text-sm text-gray-500">
  //                 {authorValue?.TAGLINE || "Your tagline"}
  //               </p>
  //             </div>
  //           </div>
  //           <div className="flex items-center gap-8">
  //             <div className="text-center">
  //               <p className="text-lg font-semibold text-gray-900">
  //                 {followers}
  //               </p>
  //               <p className="text-sm text-gray-500">Followers</p>
  //             </div>
  //             <div className="text-center">
  //               <p className="text-lg font-semibold text-gray-900">
  //                 {following}
  //               </p>
  //               <p className="text-sm text-gray-500">Following</p>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Form */}
  //         <form
  //           onSubmit={handleSubmit(submitInfo)}
  //           className="px-8 py-8 space-y-6"
  //         >
  //           {/* Basic Info */}
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               Full Name *
  //             </label>
  //             <Input
  //               disabled={disable}
  //               type="text"
  //               placeholder="Enter your full name"
  //               className="w-full border-gray-300 rounded-lg px-4 py-2 text-base"
  //               {...register("name", { required: true })}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               Username *
  //             </label>
  //             <Input
  //               disabled={disable}
  //               type="text"
  //               placeholder="@username"
  //               className="w-full border-gray-300 rounded-lg px-4 py-2 text-base"
  //               {...register("username", { required: true })}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               Tagline
  //             </label>
  //             <Input
  //               disabled={disable}
  //               type="text"
  //               placeholder="e.g. Tech Enthusiast | Writer"
  //               className="w-full border-gray-300 rounded-lg px-4 py-2 text-base"
  //               {...register("tagline")}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               Profession
  //             </label>
  //             <Input
  //               disabled={disable}
  //               type="text"
  //               placeholder="e.g. Software Engineer, Blogger"
  //               className="w-full border-gray-300 rounded-lg px-4 py-2 text-base"
  //               {...register("profession")}
  //             />
  //           </div>

  //           {/* Bio */}
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               About *
  //             </label>
  //             <textarea
  //               disabled={disable}
  //               rows={4}
  //               placeholder="Tell something about yourself"
  //               className="w-full border-gray-300 px-4 py-2 rounded-lg text-base resize-none"
  //               {...register("about", { required: true })}
  //             />
  //           </div>

  //           {/* Links */}
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               Website
  //             </label>
  //             <Input
  //               disabled={disable}
  //               type="url"
  //               placeholder="https://yourwebsite.com"
  //               className="w-full border-gray-300 rounded-lg px-4 py-2 text-base"
  //               {...register("website")}
  //             />
  //           </div>

  //           <div className="grid grid-cols-2 gap-6">
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 Twitter
  //               </label>
  //               <Input
  //                 disabled={disable}
  //                 type="url"
  //                 placeholder="https://twitter.com/yourhandle"
  //                 className="w-full border-gray-300 rounded-lg px-4 py-2 text-base"
  //                 {...register("twitter")}
  //               />
  //             </div>
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-1">
  //                 LinkedIn
  //               </label>
  //               <Input
  //                 disabled={disable}
  //                 type="url"
  //                 placeholder="https://linkedin.com/in/yourprofile"
  //                 className="w-full border-gray-300 rounded-lg px-4 py-2 text-base"
  //                 {...register("linkedin")}
  //               />
  //             </div>
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               Location
  //             </label>
  //             <Input
  //               disabled={disable}
  //               type="text"
  //               placeholder="City, Country"
  //               className="w-full border-gray-300 rounded-lg px-4 py-2 text-base"
  //               {...register("location")}
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-1">
  //               Public Email
  //             </label>
  //             <Input
  //               disabled={disable}
  //               type="email"
  //               placeholder="example@email.com"
  //               className="w-full border-gray-300 rounded-lg px-4 py-2 text-base"
  //               {...register("email")}
  //             />
  //           </div>

  //           {/* Actions */}
  //           <div className="pt-4 flex justify-end">
  //             {!disable ? (
  //               <Button
  //                 type="submit"
  //                 className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700"
  //               >
  //                 Save Profile
  //               </Button>
  //             ) : (
  //               <button
  //                 type="button"
  //                 className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
  //                 onClick={() => setDisable(false)}
  //               >
  //                 Edit Profile
  //               </button>
  //             )}
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
      
  return (
    <>
      <div className="flex flex-col bg-orange-300 m-4 sm:m-10 h-fit gap-10 w-full p-4 sm:p-6">
        {/* Top Section */}
        <div className="w-full flex flex-col lg:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="h-28 w-28 rounded-full border border-gray-300 overflow-hidden bg-gray-100">
            {imageFile && imageFile.length > 0 ? (
              <img
                src={URL.createObjectURL(imageFile[0])}
                alt="Avatar Preview"
                className="h-full w-full object-cover"
              />
            ) : authorValue?.AVATAR ? (
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
            <div className="flex flex-row items-center gap-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 w-full lg:w-1/3 justify-around">
              <div className="flex flex-col items-center">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Followers
                </h2>
                <span className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                  0
                </span>
              </div>

              <div className="h-10 w-px bg-gray-300"></div>

              <div className="flex flex-col items-center">
                <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Following
                </h2>
                <span className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                  {followingcount}
                </span>
              </div>
            </div>

            <h3 className="text-center lg:text-left">links</h3>
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
                  disabled="True"
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
                  placeholder="Twitter url"
                  {...register("twitterurl")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
