import React, { createContext, useState } from 'react';

export const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  // Sąrašas su pradinių komentarų objektais
  const [comments, setComments] = useState([
    { id: 1, author: 'John Doe', text: 'This is a comment' },
    { id: 2, author: 'Jane Doe', text: 'This is another comment' },
    { id: 3, author: 'Jim Doe', text: 'This is yet another comment' },
  ]);

  // Pateikiamas komentarų sąrašas ir funkcija nustatyti naują komentarų sąrašą
  return (
    <CommentContext.Provider value={{ comments, setComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;