import React, { useState} from "react";
import PostUI from "./PostUI"; 

function Post({ uploadedImage, uploadedVideo, clearUploads, selectedGroup,username,avatar }) {
  const [postContent, setPostContent] = useState("");
  const [postsByGroup, setPostsByGroup] = useState({});
  const [showCommentSection, setShowCommentSection] = useState({});
  const [comments, setComments] = useState([]);

  const currentUser = { name: username};

  const sendPost = () => {
    if (postContent.trim() || uploadedImage || uploadedVideo) {
      const newPost = {
        id: Date.now(),
        userName: currentUser.name,
        userAvatar: avatar || "https://via.placeholder.com/50",
        content: postContent,
        image: uploadedImage, 
        video: uploadedVideo,
        likes: 0,
        group: selectedGroup,
      };
      setPostsByGroup((prev) => ({
        ...prev,
        [selectedGroup]: [newPost, ...(prev[selectedGroup] || [])],
      }));
      setPostContent("");
      clearUploads();
    } else {
      alert("Please enter some content or upload media!");
    }
  };

  const handleDeletePost = (postId) => {
    setPostsByGroup((prevPostsByGroup) => {
      const updatedPosts = { ...prevPostsByGroup };
      updatedPosts[selectedGroup] = updatedPosts[selectedGroup].filter(
        (post) => post.id !== postId
      );
      return updatedPosts;
    });
  };

  const addCommentOrReply = (postId, content, parentId = null) => {
    const newComment = {
      id: Date.now(),
      author:currentUser.name,
      avatar: avatar|| "https://via.placeholder.com/50",
      content,
      replies: [],
    };
    setComments((prevComments) => {
      const updatedComments = { ...prevComments };
      const postComments = updatedComments[postId] || [];
      if (parentId) {
        updatedComments[postId] = addNestedReply(postComments, parentId, newComment);
      } else {
        updatedComments[postId] = [...postComments, newComment];
      }
      return updatedComments;
    });
  };

  const addNestedReply = (comments, parentId, reply) => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
         // 确保 reply 的内容是实际文本内容
         const actualContent = typeof reply.content === "string" ? reply.content : reply.content.content;
        return { ...comment, replies: [...(comment.replies || []), {...reply,content:actualContent}] };
      } else if (comment.replies) {
        return { ...comment, replies: addNestedReply(comment.replies, parentId, reply) };
      }
      return comment;
    });
  };

  const deleteCommentOrReply = (postId, commentId) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: deleteNestedComment(prevComments[postId] || [], commentId),
    }));
  };

  const deleteNestedComment = (comments, commentId) => {
    return comments
      .map((comment) => {
        if (comment.id === commentId) return null;
        return { ...comment, replies: deleteNestedComment(comment.replies || [], commentId) };
      })
      .filter((comment) => comment !== null);
  };

  const toggleCommentSection = (postId) => {
    setShowCommentSection((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const currentGroupPosts = postsByGroup[selectedGroup] || [];

  return (
    <PostUI
      postContent={postContent}
      setPostContent={setPostContent}
      sendPost={sendPost}
      currentGroupPosts={currentGroupPosts}
      showCommentSection={showCommentSection}
      toggleCommentSection={toggleCommentSection}
      handleDeletePost={handleDeletePost}
      comments={comments}
      addCommentOrReply={addCommentOrReply}
      deleteCommentOrReply={deleteCommentOrReply}
      currentUser={currentUser} // 传递当前用户信息到 PostUI
    />
  );
}

export default Post;
