import React, { useState } from 'react';
import Comment from './Comment';
import './CommentSection.css';


function CommentSection({ comments = [], onAddComment, onReplySubmit, onDelete, currentUser }) {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="comment-section">
      <div className="add-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="writing here..."
        />
        <button onClick={handleAddComment}>Comment</button>
      </div>

      <div className="comments-list">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            commentData={comment}
            onReplySubmit={(content, parentId, parentAuthor) => {
              onReplySubmit(content, parentId, parentAuthor)
            }}
            onDelete={(commentId, parentCommentId) => onDelete(commentId, parentCommentId)}
            currentUser={currentUser} 
          />
        ))}
      </div>
    </div>
  );
}

export default CommentSection;