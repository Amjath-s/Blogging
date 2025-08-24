  import React, { useState, useEffect } from "react";
  import { useForm } from "react-hook-form";
  // import Input from "../component/Input"
  import { Input } from "./index";
  import { Button } from "./index";
  import appwriteService from "../appwrite/store";
  import authService from "../appwrite/auth";
  import appwriteAuthservice from "../appwrite/authorService";

  function ProfileForm() {
    const { register, handleSubmit, setValue, watch,errors,reset} = useForm();
    const [userId, setuserId] = useState(null);
    const  [documentid,setDocumentId]=useState(null)
    const [authorvalue,setAuthorValue]=useState(" ")
    const [disable,setDisable]=useState(true)

    useEffect(() => {
      authService.getCurrentUser().then((userData) => {
        console.log("userData in profileform", userData);
        setuserId(userData.$id);
      });
    }, []);

    useEffect(()=>

    {  
      if(!userId) return 
      
      appwriteAuthservice
      .getAuthorInfo(userId)
      .then((data) => {
        console.log("author info ", data);
        if (data?.documents?.length > 0) {
          setAuthorValue(data.documents[0]);
          reset({
            name: data.documents[0].AUTHORNAME || "",
            interest: data.documents[0].INTEREST || "",
            about: data.documents[0].ABOUT || "",
          });
          setDisable(true);
        } else {
          setAuthorValue(null);
          reset({
            name: "",
            interest: "",
            about: "",
          });
          setDisable(false); // enable inputs
        }
      })
      .catch((err) => {
        console.error("Error fetching author info", err);
        // fallback to empty form enabled
        reset({ name: "", interest: "", about: "" });
        setDisable(false);
      });;
    console.log("running")
    console.log("the userid in i",userId)
  

    },[userId])

      const  submitInfo = async (data) => {
      console.log("image ", data);
      if (data) {
        const file = data.image[0]
          ? await appwriteService.uplaodFile(data.image[0])
          : null;
        const fileId = file ? file.$id : null;
        console.log("cehck usedata exist in posfomr", userId);
        console.log("file id", fileId);

        const authInfo = await appwriteAuthservice.postAuthorInfo({
          ...data,
          avatar: fileId,
          userId: userId,
        });
        console.log(authInfo);
        console.log("this is runng when edit is clik",disable)
        setDocumentId(authInfo.$id)
         setDisable(true); // disable form inputs again
         setAuthorValue(data); // update local state with new data
         reset(data);
      }
    };
    const imageFile = watch("image");
    console.log("this is runng when edit is clik", disable);
    
    

    return (
      <div className="flex items-center flex-col w-full justify-center min-h-screen ">
        <div className=" rounded-3xl shadow-2xl px-10 pt-10 pb-8 w-full max-w-2xl">
          {/* Big profile header visual with avatar and basic fields */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {/* Avatar Preview Circle */}

              <div className="h-28 w-28 rounded-full bg-gray-200 border-4  flex items-center justify-center overflow-hidden shadow">
                {imageFile && imageFile.length > 0 ? (
                  <img
                    src={URL.createObjectURL(imageFile[0])}
                    alt="Avatar Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-4xl">👤</span>
                )}
              </div>
              {/* Image input - visually linked to avatar */}
              <Input
                disabled={disable}
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                className="absolute right-0 bottom-0 text-white p-1 rounded-full cursor-pointer shadow-md text-xs"
                style={{ width: "36px", height: "36px", opacity: 1 }}
                {...register("image")}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const imgURL = URL.createObjectURL(e.target.files[0]);
                  }
                }}
                title="Change Avatar"
              />
            </div>
            {/* Name Field overlayed under avatar */}
          </div>

          {/* Main form fields in two columns */}
          <div className="grid-4 gap-2 flex flex-col">
            <form
              onSubmit={handleSubmit(submitInfo)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              <div className="mt-6">
                <Input
                  disabled={disable}
                 
                  label=" Name *"
                  type="text"
                  placeholder="Enter your name"
                  className="w-72 border-2 border-blue-200 rounded-xl px-5 py-3 text-lg shadow focus:ring-2 focus:ring-blue-200 outline-none text-center"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="flex flex-col mt-6">
                <Input
                  disabled={disable}
                  label="Interest *"
                  type="text"
                  placeholder="Your main interest (e.g. writing, tech, art)"
                  className="w-72 border-2 border-blue-200 rounded-xl px-5 py-3 text-lg shadow focus:ring-2 focus:ring-blue-200 outline-none text-center px-4 py-2 rounded-lg text-base focus:ring-blue-200 w-72 "
                  {...register("interest", { required: true })}
                />
              </div>
              <div className="flex flex-col col-span-1 sm:col-span-2">
                <label
                  className="font-medium text-gray-700 mb-1"
                  htmlFor="about"
                >
                  About *
                </label>
                <textarea
                  disabled={disable}
                  id="about"
                  rows={4}
                  placeholder="Tell something about yourself"
                  className="border px-4 py-2 rounded-lg text-base focus:ring-blue-200 resize-none"
                  {...register("about", { required: true })}
                />
              </div>
              <div className="col-span-1 sm:col-span-2 flex justify-center mt-6">
                {!disable ? (
                  <Button
                    type="submit"
                    className="w-60 py-3 rounded-xl border-none bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition duration-200"
                  >
                    Submit
                  </Button>
                ) : (
                  <button
                  type="button"
                  
                    className="w-60 py-3 rounded-xl border-none bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-700 transition duration-200"
                    onClick={(e) => {e.preventDefault ,setDisable(false)}}
                  >
                    Ecit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  export default ProfileForm;
