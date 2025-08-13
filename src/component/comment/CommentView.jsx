import React, { useState } from "react";
import CommentInput from "./CommentInput";
import appwriteComment from "../../appwrite/comment"

function CommentView({
  comments = [],
  postId,
  setComment,
  userdata,
  parentcommentId = null,
}) {
  const [replyingToId, setReplyingToId] = useState(null);
  const [expandedReplies, setExpandedReplies] = useState({}); // {commentId: true/false}

  // Filter only comments that match the current parent
  const currentComments = comments.filter(
    (comment) => comment.PARENTCOMMENTID === parentcommentId
  );

  if (!currentComments.length) return null;

  const toggleReplies = (id) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleReplyInput = (id) => {
    setReplyingToId((prev) => (prev === id ? null : id));
  };


  const deleteComment = (commentId) =>
  {
    console.log("deleting running")
    appwriteComment.deleteComment({ commentId: commentId }).then(data =>
      console.log("deleted")
    )

  }
  return (
    <div className="ml-4 border-l-2 border-gray-300 pl-4">
      {currentComments.map((comment) => {
        const childCount = comments.filter(
          (c) => c.PARENTCOMMENTID === comment.$id
        ).length;
        const showReplies = expandedReplies[comment.$id];

        return (
          <div key={comment.$id} className="mb-4">
            <p className="font-medium">{comment.USERNAME}</p>
            <p>{comment.COMMENT}</p>
            <p>  commentedat:{new Date(comment.$createdAt).toLocaleDateString()}</p>

            <div className="flex flex-row gap-4 text-sm text-blue-500 mt-1">
              <button onClick={() => toggleReplyInput(comment.$id)}>
                {replyingToId === comment.$id ? "Cancel" : "Reply"}
              </button>

              {childCount > 0 && (
                <button onClick={() => toggleReplies(comment.$id)}>
                  {showReplies
                    ? `Hide replies (${childCount})`
                    : `Show replies (${childCount})`}
                </button>
              )}
              {userdata.name === comment.USERNAME && (
                <button onClick={() => deleteComment(comment.$id)}>
                  {" "}
                  delete
                </button>
              )}
            </div>

            {replyingToId === comment.$id && (
              <div className="mt-2">
                <CommentInput
                  parentcommentId={comment.$id}
                  postId={postId}
                  setComment={setComment}
                  userdata={userdata}
                  onCancel={() => setReplyingToId(null)}
                />
              </div>
            )}
            {showReplies && (
              <CommentView
                comments={comments}
                postId={postId}
                setComment={setComment}
                userdata={userdata}
                parentcommentId={comment.$id}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CommentView;
