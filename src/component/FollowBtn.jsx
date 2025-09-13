import React, { useState, useEffect } from "react";
import userfollowservice from "../appwrite/userFollow";

function FollowBtn({ FolloweeId, FollowerId, children }) {
  const [updatebtn, setUpdatebtn] = useState(false);
  const [isfollow, setIsFollow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      if (!isfollow) {
       
        await userfollowservice.putUserFollow({
          userFollower: FollowerId,
          userFollowee: FolloweeId,
        });
      } else {
        
        await userfollowservice.deleteUserFollow({
          userFollower: FollowerId,
          userFollowee: FolloweeId,
        });
      }
      // Toggle the updatebtn once per action to trigger useEffect refetch
      setUpdatebtn((prev) => !prev);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchFollowStatus() {
      try {
       
        const data = await userfollowservice.checkFollow({
          userFollower: FollowerId,
          userFollowee: FolloweeId,
        });
     

        setIsFollow(Array.isArray(data.documents) && data.documents.length > 0); // Set true if following, false otherwise
      } catch (error) {
        console.log(error, "in checking following");
        setIsFollow(false);
      }
    }
    if (FollowerId && FolloweeId) {
      fetchFollowStatus();
    }
  }, [updatebtn, FollowerId, FolloweeId]);

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className="px-6 py-2 rounded-full font-bold text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 shadow-lg transition"
    >
      {loading ? "Processing..." : isfollow ? "Following" : "Follow"}
    </button>
  );
}

export default FollowBtn;
