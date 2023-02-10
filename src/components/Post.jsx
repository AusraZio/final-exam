import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import Comment from "./Comment";

const Post = ({ data }) => {
  // Destructure values from the UserContext
  const { users, loggedInUser } = useContext(UserContext);
  // Destructure values from the PostContext
  const { deletePost } = useContext(PostContext);
  
  // State hook to store the post's bookmarked status
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Function to handle bookmarking the post
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Find the user who posted this message by matching the user's ID to the message author's ID
  const postOwner = users.find(user => user.id === data.userId);

  // Function to handle adding a comment
  const addComment = (postId, comment) => {
    // Your implementation to add a comment
  };

  return (
    <div className="post-container">
      <div className="post-header">
        {postOwner &&
        <>
        <img
          className="post-header-avatar"
          src={postOwner.avatar}
          alt="user avatar"
        />
        <span className="post-header-username">{postOwner.userName}</span>
        </>
}
        {
          // Only show the delete and edit buttons if the logged in user is the post owner
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