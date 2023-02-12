import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import Comment from "./Comment";

const Post = ({ data }) => {
  // Pasiima reikšmes iš UserContext
  const { users, loggedInUser } = useContext(UserContext);
  // Pasiima  reikšmes iš PostContext
  const { deletePost } = useContext(PostContext);
  
  // State kintamasis saugoti žymėjimo statusui
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Funkcija tvarkanti žymėjimą
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Ieško žinutės autoriaus pagal jo ID
  const postOwner = users.find(user => user.id === data.userId);

  // Funkcija tvarkanti komentaro pridėjimą
  const addComment = (postId, comment) => {
    // Įgyvendinimas komentaro pridėjimui
  };

  return (
    <div className="post-container">
      <div className="post-header">
        {postOwner &&
        <>
        <img
          className="post-header-avatar"
          src={postOwner.avatar}
          alt="vartotojo avataras"
        />
        <span className="post-header-username">{postOwner.userName}</span>
        </>
}
        {
          // Rodo tik trinti ir redaguoti mygtukus, jei prisijungęs vartotojas yra žinutės savininkas
          loggedInUser && loggedInUser.id === postOwner.id &&
          <>
            <button className="post-header-delete-button" onClick={() => deletePost(data.id)}>Delete</button>
            <Link to={`/editPost/${data.id}`} className="post-header-edit-button">Edit</Link>
          </>
        }
        <button className={`post-header-bookmark-button ${isBookmarked ? 'active' : ''}`} onClick={handleBookmark}>
          {isBookmarked ? 'Dislike' : 'Like'}
        </button>
      </div>
      <hr className="post-divider" />
      <h1 className="post-heading">{data.heading}</h1>
      <p className="post-content">{data.content}</p>
      <hr className="post-divider" />
      <Comment postId={data.id} addComment={addComment} />
    </div>
  );
};

export default Post;