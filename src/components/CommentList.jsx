import React, { useContext } from 'react';
import { CommentContext } from './CommentContext';

const CommentList = () => {
  const { comments } = useContext(CommentContext);

  return (
    <ul>
      {comments.map(comment => (
        <li key={comment.id}>
          <strong>{comment.author}: </strong>
          {comment.text}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;

