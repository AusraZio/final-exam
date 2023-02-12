import Post from "./Post";
import PostContext from "../contexts/PostContext";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

const UserPosts = () => {
  // Gauk prisijungusio vartotojo informaciją iš UserContext
  const { loggedInUser } = useContext(UserContext);
  // Gauk visus skelbimus iš PostContext
  const { posts } = useContext(PostContext);

  return (
    <>
      {
        // Filtruok skelbimus pagal prisijungusio vartotojo ID ir renderink juos naudojant Post komponenta
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