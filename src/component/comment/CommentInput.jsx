import React, { useState } from "react";
import { Button } from "../index";
import CommentView from "./CommentView";
import commentservice from "../../appwrite/comment";
import { set } from "react-hook-form";

// function CommentInput({ parentcommentId, postId, userdata, setComment, onCancel })
function CommentInput({ parentcommentId, postId, userdata, onCancel }) {
  const MAXVALUE = 100;
  const [content, setContent] = useState(""); //this contain comment that to send
  const userId = userdata?.$id;
  const userName = userdata?.name;
  // const userName=userdata.name

  // For displaying comment count - optional

  const postComment = async (content) => {
    if (!content.trim()) return;

    try {
      await commentservice
        .commentPost({ parentcommentId, postId, userId, content, userName })
        .then(setContent(""));
    } catch (error) {
      console.log("erorr in commenting", error);
    }

    if (onCancel) onCancel();
  };

  return (
    <>
      <div className="flex flex-col grid-cols-1 ">
        {/* Comments: {comments.length} */}
        <textarea
          maxLength={MAXVALUE}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full overflow-hidden border-black outline-1"
          placeholder="Write your comment..."
        />
        <p>
          {MAXVALUE - content.length} / {MAXVALUE}
        </p>
        <div>
          <Button onClick={() => postComment(content)}>Comment</Button>
        </div>
      </div>
    </>
  );
}

export default CommentInput;
