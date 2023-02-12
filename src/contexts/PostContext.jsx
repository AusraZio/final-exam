import { createContext, useState, useEffect } from "react";

// Sukuriamas PostContext objektas
const PostContext = createContext();

// Sukuriama PostProvider komponentė, kurioje yra definuojama būsena ir vykdomi duomenų užklausų CRUD veiksmai
const PostProvider = ({ children }) => {
  // Būsena: pažymėti įrašai ir visi įrašai
  const [markedPosts, setMarkedPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  // Funkcija, kuri pakviečiama kai komponentas yra sugeneruojamas
  useEffect(() => {
    // Siunčiama užklausa, siekiant gauti įrašus iš serverio
    fetch('http://localhost:5000/posts')
      .then(res => {
        if (res.status !== 200) throw new Error('Error fetching data')
        return res.json()
      }).then(data => {
        console.log(data);
        setPosts(data);
      }).catch(error => {
        console.error('Error:', error);
      });
  }, []);

  // Funkcija, kuri pažymi arba nuima pažymėjimą iš įrašo
  const toggleMark = (post) => {
    if (markedPosts.includes(post)) {
      setMarkedPosts(markedPosts.filter(p => p !== post));
    } else {
      setMarkedPosts([...markedPosts, post]);
    }
  }

  // Funkcija, kuri prideda naują įrašą
  const addNewPost = (newPost) => {
    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    })
      .then(res => res.json())
      .then(data => {
        setPosts([...(posts || []), data]);
      });
  }

  // Funkcija, kuri pašalina įrašą
  const deletePost = (id) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      });
  }

  // Funkcija, kuri atnaujina įrašą
  const updatePost = (id, updatedPost) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost)
    })
      .then(res => res.json())
      .then(data => {
        setPosts(posts.map(post => post.id.toString() === id ? { ...post, ...data } : post));
      });
  }

  // Grąžinama PostContext.Provider komponentė su reikšmėmis, kurios bus naudojamos kitose komponentėse
  return (
    <PostContext.Provider
      value={{
        posts,
        addNewPost,
        deletePost,
        updatePost,
        markedPosts,
        toggleMark,
        setMarkedPosts
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

// Eksportuojamos PostProvider ir PostContext objektai
export { PostProvider };
export default PostContext;