import React from "react";
import cursor from "../Assets/cursor.png";
import "./PostUI.css";
import { IconButton, Flex } from "@chakra-ui/react";
import { FaRegComment, FaTrash } from "react-icons/fa";
import Like from "./Posts/like";
import CommentSection from "./Posts/CommentSection";

function PostUI({
  postContent,
  setPostContent,
  sendPost,
  currentGroupPosts,
  showCommentSection,
  toggleCommentSection,
  handleDeletePost,
  comments,
  addCommentOrReply,
  deleteCommentOrReply,
  generateRandomUsername
}) {
  return (
    <article className="post-area">
      <div className="post-container">
        <div className="input-wrapper">
          <input
            type="text"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write something here..."
            className="input-field"
          />
        </div>
        <img src={cursor} alt="send post" className="action-icon" onClick={sendPost} />
      </div>

      <div className="posts-list">
        {currentGroupPosts.map((post) => (
          <div key={post.id} className="post-item">
            <div className="post-header">
              <img src={post.userAvatar} alt={`${post.userName}'s avatar`} className="post-avatar" />
              <div className="content-container">
                <span className="post-username">{post.userName}</span>
                <p className="post-content">{post.content}</p>
                {post.image && <img src={post.image} alt="Uploaded" className="uploaded-media" />}
                {post.video && <video controls src={post.video} className="uploaded-media" />}
              </div>
            </div>

            <Flex justify="space-between" mt="10px">
              <Like initialLikes={post.likes} />
              <IconButton
                icon={<FaRegComment />}
                aria-label="Comment on post"
                variant="ghost"
                onClick={() => toggleCommentSection(post.id)}
              />
              <IconButton
                icon={<FaTrash />}
                aria-label="Delete post"
                variant="ghost"
                onClick={() => handleDeletePost(post.id)}
              />
            </Flex>

            {showCommentSection[post.id] && (
              <CommentSection
                comments={comments[post.id] || []}
                onAddComment={(content) => addCommentOrReply(post.id, content)}
                onReplySubmit={(content, parentId) => addCommentOrReply(post.id, content, parentId)}
                onDelete={(commentId) => deleteCommentOrReply(post.id, commentId)}
                generateRandomUsername={generateRandomUsername}
              />
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

export default PostUI;