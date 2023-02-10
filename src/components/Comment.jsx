import React, { useState } from 'react';

const Comment = ({ postId, addComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(postId, commentText);
    setCommentText('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-textarea"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
      />
      <button className="comment-submit-button">Submit</button>
    </form>
  );
};

export default Comment;