import PostContext from "../contexts/PostContext";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPostForm = () => {
  // nustatome pradinius formos laukų reikšmes
  const [formInputs, setFormInputs] = useState({
    heading: '', // antraštė
    content: '' // turinys
  });

  // gauname funkcijas iš konteksto
  const { addNewPost } = useContext(PostContext);
  const { loggedInUser } = useContext(UserContext);

  // naudojame React Router navigacijai
  const navigation = useNavigate();

  // formos siuntimo funkcija
  const handleSubmit = e => {
    // uždraudžiame formos siuntimo defaultinį veiksmą
    e.preventDefault();
    // sukuriame naują objektą iš formos laukų reikšmių
    const newPost = {
      heading: formInputs.heading,
      content: formInputs.content,
      id: Date.now(),
      userId: loggedInUser.id
    };
    // iškviečiame funkciją, kuri prideda naują įrašą
    addNewPost(newPost);
    // nukreipiame vartotoją į pagrindinį puslapį
    navigation('/');
  }


  return (
    <>
      <form className='new-post-form' onSubmit={handleSubmit}>
        <label className='new-label'>
          Heading:
          <input className='new-input' type="text" name="heading"
            value={formInputs.heading}
            onChange={(e) => setFormInputs({...formInputs, heading:e.target.value})}
          />
        </label>
        <label className='new-label'>
          Content:
          <input className='new-input' type="text" name="content"
            value={formInputs.content}
            onChange={(e) => setFormInputs({...formInputs, content:e.target.value})}
          />
        </label>
        <input className='new-submit' type="submit" value="Create new Post" />
      </form>
    </>
  );
}
 
export default NewPostForm;