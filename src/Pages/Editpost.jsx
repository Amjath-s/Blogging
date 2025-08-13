import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../component";
import appwriteService from "../appwrite/store";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Editpost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((response) => {
        if (response) {
          setPost(response);
          console.log("post", response);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default Editpost;
