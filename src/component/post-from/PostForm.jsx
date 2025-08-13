import React, { useCallback, useEffect } from "react";

import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PostForm({ post }) {
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
        slug: post?.Slug || "",
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
        });
        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase().slice(0,36)
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const slug = slugTransform(value.title);
        setValue("slug", slug, { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe(); // Clean up the subscription
    };
  }, [watch, slugTransform, setValue] );

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
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
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <Input
          label="caption"
          placeholder="breif about the content of post"
          className="mb-4"
          {...register("caption",{required:true})}
        
        />
        {/* <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        /> */}
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
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
          options={['AI', 'Science', 'IT', 'Personality', 'CS']}
          label="Tag"
          className="mb-4"
          {...register("tag",{required:true})}
        
        
        />
        <Button
          onClick={() => console.log("post form button")}
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
