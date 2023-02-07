import UserContext from "../components/UserContext";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

const UserInfo = () => {
  // Naudojama useContext hook'a, kad būtų galima gauti prisijungusio vartotojo informaciją
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  
  // Naudojama useNavigate hook'a, kad būtų galima nukreipti vartotoją į kitą puslapį
  const navigation = useNavigate();
  
  // Funkcija, kuri ištrina prisijungusio vartotojo duomenis ir nukreipia į pagrindinį puslapį
  const logOutUser = () => {
  setLoggedInUser(null);
  navigation('/');
  }
  
  // JSX komponentas, kuris atvaizduoja prisijungusio vartotojo informaciją ir navigacijos mygtukus
  return (
  
    <div className="user-info-container">
    <div className="user-info-nav">
    <Link to="/" className="user-info-nav-link">Home Page</Link>
    </div>
    <div className="user-info-right">
    {
    // Jei prisijungęs vartotojas yra administratorius, tada rodomas mygtukas "Valdyti vartotojus"
    (loggedInUser.level === 'admin') && <Link to="/users" className="user-info-nav-link">Manage users</Link>
    }
    <Link to="/newPost" className="user-info-nav-link">Add new post</Link>
    <Link to="/user" className="user-info-nav-link">
    <img
             src={loggedInUser.avatar}
             alt="vartotojo avataras"
             className="user-info-avatar"
           />
    <span className="user-info-username">{loggedInUser.userName}</span>
    </Link>
    <button onClick={() => logOutUser()} className="user-info-logout-btn">Log out</button>
    </div>
    </div>
    );
    }
  export default UserInfo;