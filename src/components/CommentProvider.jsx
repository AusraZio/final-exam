import { createContext, useState, useEffect } from "react";

// Sukuriame komentaru konteksta
const CommentContext = createContext();

const CommentProvider = ({ children }) => {

  // Sukuriame komentaru busena su useState
  const [comments, setComments] = useState([]);

  // Sukuriame useEffect kad gauti komentarus is serverio ir atnaujinti komentaru busena
  useEffect(() => {
    fetch('http://localhost:5000/comments')
      .then(res => {
        if (res.status !== 200) throw new Error('Error fetching data')
        return res.json()
      }).then(data => {
        console.log(data);
        setComments(data);
      }).catch(error => {
        console.error('Error:', error);
      });
  }, []);

  // Funkcija kuri leidzia prideti nauja komentara i komentaru busena
  const addNewComment = (newComment) => {
    fetch('http://localhost:5000/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment)
    })
      .then(res => res.json())
      .then(data => {
        setComments([...(comments || []), data]);
      });
  }

  // Funkcija kuri leidzia istrinti komentara is komentaru busenos
  const deleteComment = (id) => {
    fetch(`http://localhost:5000/comments/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setComments(comments.filter(comment => comment.id !== id));
      });
  }

  // Funkcija kuri leidzia atnaujinti komentara komentaru busenoje
  const updateComment = (id, updatedComment) => {
    fetch(`http://localhost:5000/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedComment)
    })
      .then(res => res.json())
      .then(() => {
        setComments(comments.map(comment => (comment.id === id ? updatedComment : comment)));
      });
  }

  return (
    // Perduodame reiksmes per komentaru konteksta
    <CommentContext.Provider value={{ comments, addNewComment, deleteComment, updateComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentContext, CommentProvider };