import React, { useState } from 'react';

const Comment = ({ postId, addComment }) => {
  // Sukuriame state kintamąjį "commentText", kuriame saugosime naujo komentaro tekstą
  const [commentText, setCommentText] = useState('');

  // Funkcija, kuri bus iškviesta paspaudus "Submit" mygtuką. Jos pagalba pranešime "Post" komponentui apie naują komentarą.
  const handleSubmit = (e) => {
    e.preventDefault(); // Sustabdome formos persikrovimą po mygtuko paspaudimo
    addComment(postId, commentText); // Iškviečiame funkciją, kuri praneša "Post" komponentui apie naują komentarą
    setCommentText(''); // Išvalome įvesties lauką
  };

  return (
    // Forma, kurioje vartotojas gali rašyti naują komentarą ir jį paskelbti paspaudus "Submit" mygtuką
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-textarea"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)} // Atnaujiname "commentText" state kintamąjį, kai vartotojas įveda tekstą
        placeholder="Write a comment..."
      />
      <button className="comment-submit-button">Submit</button>
    </form>
  );
};

export default Comment;