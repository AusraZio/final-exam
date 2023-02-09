import PostContext from "../contexts/PostContext";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPostForm = () => {
  // Gauname 'id' iš URL naudodami 'useParams' hook'a
  const { id } = useParams();

  // Gauname 'posts' ir 'updatePost' funkcijas iš 'PostContext' naudodami 'useContext' hook'a
  const { posts, updatePost } = useContext(PostContext);

  // Randa dabartinį post'ą pagal 'id' iš URL
  const currentPost = posts.find(post => post.id.toString() === id)

  // Sukuriame navigacijos funkciją naudodami 'useNavigate' hook'a
  const navigation = useNavigate();

  // Sukuriame formos įvesties būsenos kintamąjį, pradinį jį nustatome su dabartinio posto antrašte ir turiniu
  const [formInputs, setFormInputs] = useState({
    heading: currentPost.heading,
    content: currentPost.content
  });

  // Apdorojame formos pateikimą
  const handleSubmit = e => {
    // Nutraukiamės nuo numatytosios formos pateikimo elgsenos
    e.preventDefault();
    
    // Iškviečiame 'updatePost' funkciją su 'id' ir formos įvestimis
    updatePost(id, formInputs);
    
    // Grįžtame į pagrindinį puslapį
    navigation('/');
  }


  return (
    <>
      <form className='edit-form' onSubmit={handleSubmit}>
        <label className='edit-label'>
          Heading:
          <input className='edit-input' type="text" name="heading"
            value={formInputs.heading}
            onChange={(e) => setFormInputs({...formInputs, heading:e.target.value})}
          />
        </label>
        <label className='edit-label'>
          Content:
          <input className='edit-input' type="text" name="content"
            value={formInputs.content}
            onChange={(e) => setFormInputs({...formInputs, content:e.target.value})}
          />
        </label>
        <input className='edit-submit' type="submit" value="Edit Post" />
      </form>
    </>
  );
}
 
export default EditPostForm;