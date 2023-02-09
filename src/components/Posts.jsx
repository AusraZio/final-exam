import PostContext from "../contexts/PostContext";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import Post from "./Post";

const Posts = () => {
    const { posts } = useContext(PostContext);
    const { users } = useContext(UserContext);

    // Gauti visų užblokuotų vartotojų ID
    const bannedUsers = users.map(user => user.isBanned && user.id).filter(item => item !== false);
    // Filtruoti pranešimus, kurių autoriai nėra užblokuoti
    const availablePosts = posts.filter(post => !bannedUsers.includes(post.userId));

    return (
        <div className="posts-container">
            {
                availablePosts.map(post =>
                    <Post
                        key={post.id}
                        data={post}
                    />
                )
            }
        </div>
    );
}

export default Posts;