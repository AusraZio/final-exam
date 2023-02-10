import { createContext, useState, useEffect } from "react";

const CommentContext = createContext();

const CommentProvider = ({ children }) => {

  const [comments, setComments] = useState([]);

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

  const deleteComment = (id) => {
    fetch(`http://localhost:5000/comments/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setComments(comments.filter(comment => comment.id !== id));
      });
  }

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
    <CommentContext.Provider value={{ comments, addNewComment, deleteComment, updateComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentContext, CommentProvider };