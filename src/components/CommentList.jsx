import React, { useContext } from 'react';
import { CommentContext } from './CommentContext';

const CommentList = () => {
  // Gauname komentarų masyvą iš CommentContext
  const { comments } = useContext(CommentContext);

  return (
    <ul>
      {comments.map(comment => (
        // Atvaizduojame kiekvieną komentarą sąraše
        <li key={comment.id}>
          <strong>{comment.author}: </strong>
          {comment.text}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;

