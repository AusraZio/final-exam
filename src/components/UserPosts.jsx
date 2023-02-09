import Post from "./Post";
import PostContext from "../contexts/PostContext";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

const UserPosts = () => {

  const { loggedInUser } = useContext(UserContext);
  const { posts } = useContext(PostContext);

  return (
    <>
      {
        posts
          .filter(post => post.userId === loggedInUser.id)
          .map(post => 
            <Post 
              key={post.id}
              data={post}
            />  
          )
      }
    </>
  );
}
 
export default UserPosts;