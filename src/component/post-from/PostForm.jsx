import React, { useCallback, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const[isPosting,setIsPosting]=useState(false)
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  console.log("PostForm received post:", post);
  console.log("Post Title:", post?.Title);
  console.log("Post Content:", post?.Content);

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        author:post?.Author||"",
        title: post?.Title || "",
        content: post?.Content || "",
        // slug: post?.Slug || "",
        status: post?.Status || "active",
        tag:post?.Tag||"select a tag"
      },
    }); //watch for watch sepicfic field
  useEffect(() => {
    if (userData?.name) {
      setValue("author", userData.name); // this will include it in form data
    }
  }, [userData]);

  const submit = async (data) => {
    try {
      
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uplaodFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.FeaturedImage);
      }

      const dbpost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.FeaturedImage,
      });
      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
    } else {
      const file = await appwriteService.uplaodFile(data.image[0]); //imporve this logci
      if (file) {
        const fileId = file.$id;
        const dbpost = await appwriteService.createPost({
          ...data,
          featuredImage: fileId,
          userId: userData.$id,
          like: 0,
        });
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
          console.log("the psot ofdb", dbpost)
        }
      }
    }
    }
    catch (error)
    {
      throw error
    }
    finally
    {
      setIsPosting(false)

    }
    

};

  // const slugTransform = useCallback((value) => {
  //   if (value && typeof value === "string") {
  //     return value
  //       .trim()
  //       .toLowerCase().slice(0,36)
  //       .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
  //       .replace(/\s+/g, "-") // Replace spaces with hyphens
  //       .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
  //       .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
  //   }
  //   return "";
  // }, []);

  // useEffect(() => {
  //   const subscription = watch((value, { name }) => {
  //     if (name === "title") {
  //       const slug = slugTransform(value.title);
  //       setValue("slug", slug, { shouldValidate: true });
  //     }
  //   });

  //   return () => {
  //     subscription.unsubscribe(); // Clean up the subscription
  //   };
  // }, [watch, slugTransform, setValue] );

  return (
    <>
      <div>
        jlk
      </div>
        
  
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap md:flex-row flex-col">
      
      <div className="w-full px-2  md:w-2/3">
        <Input
          label="Author"
          disabled
          {...register("author", { required: true })}
          />
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
          />

        <Input
          label="caption"
          placeholder="breif about the content of post"
          className="mb-4"
          {...register("caption", { required: true })}
          />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          />
      </div>
      <div className=" w-full md:w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
          />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFileUrl(post.FeaturedImage)}
              alt={post.title}
              className="rounded-lg"
              />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
          />

        <Select
          options={[
            "Ai",
            "Technology",
            "psychology",
            "Health",
            "Fitness",
            "Food",
            "Travel",
            "Lifestyle",
            "Education",
            "Finance",
            "Business",
            "Entertainment",
            "Fashion",
            "Sports",
            "Gaming",
            "Art",
            "Photography",
            "Music",
            "Books",
            "Movies",
            "Environment",
          ]}
          label="Tag"
          className="mb-4"
          {...register("tag", { required: true })}
          />
      
        <Button
          type="submit"
          disabled={isPosting}
          bgColor={post ? "bg-green-500" : "bg-blue-500"}
          className={`w-[100%] ${
            isPosting ? "opacity-70 cursor-not-allowed" : ""
          }`}
          >
          {isPosting
            ? post``
            ? "Updating..."
            : "Posting..."
            : post
            ? "Update"
            : "Submit"}
        </Button>
           
      </div>
    </form>
            </>
  );
}

export default PostForm;
