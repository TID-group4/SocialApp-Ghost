import React, { useState } from "react";
import "./Comment.css";
import { IconButton } from "@chakra-ui/react";
import { FaTrash, FaRegComment } from "react-icons/fa"; // 使用 Font Awesome 的垃圾桶图标作为删除按钮

function Comment({commentData,onReplySubmit,onDelete,generateRandomUsername}) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      const replyAuthor = generateRandomUsername();
      onReplySubmit(
        {content: replyContent, author: replyAuthor, avatar: "https://via.placeholder.com/50",},
        commentData.id,
        commentData.author // 传递当前评论的作者作为 parentAuthor
      );
      setReplyContent("");
      setShowReplyInput(false);
    }
  };

  return (
    <div className="comment">
      <div className="comment-content">
        <img src={commentData.avatar} alt="User avatar" className="comment-avatar"
        />
        <div className="comment-text">
          
          <div className="comment-header">
            <span className="comment-author">
              {commentData.author}
              {commentData.parentAuthor && (
                <span className="reply-to">
                  {" "}reply to {commentData.parentAuthor}
                </span>
              )}
            </span>
            <p>{commentData.content}</p>
          </div>

          <div className="buttonsInReply">
            <IconButton
              onClick={() => setShowReplyInput(!showReplyInput)}
              aria-label="Reply to comment" variant="ghost" size="sm"
              leftIcon={<FaRegComment />}
            />
            <IconButton
              icon={<FaTrash />} aria-label="Delete comment" variant="ghost"
              onClick={() => onDelete(commentData.id, commentData.parentId)}
            />
          </div>

          {showReplyInput && (
            <div className="reply-input">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="writing here..."
              />
              <button onClick={handleReplySubmit}>Comment</button>
            </div>
          )}
        </div>
      </div>

      <div className="reply-list">
        {(commentData.replies || []).map((reply) => {
          return (
            <Comment
              key={reply.id} //这里的 key 仅用于帮助 React 跟踪和管理组件，而不会作为 prop 传递给 Comment 组件。
              commentData={{...reply,isReply: true,parentAuthor: commentData.author}}
              onReplySubmit={onReplySubmit}
              onDelete={onDelete}
              generateRandomUsername={generateRandomUsername}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Comment;
