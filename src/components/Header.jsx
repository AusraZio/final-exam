import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

const Header = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <header className="header">
      <img
        src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297__340.png"
        alt="Logo"
        style={{ width: "100px", height: "auto" }}
      />
      <nav>
        <ul className="nav-links">
          {loggedInUser ? (
            <UserInfo />
          ) : (
            <div className="loginRegister">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Registration</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;