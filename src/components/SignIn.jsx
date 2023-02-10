import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const SignIn = () => {
  // Use "useNavigate" hook to redirect the user to the main page after a successful login
  const navigate = useNavigate();

  // Use "useContext" hook to get access to the "UserContext" and set the logged in user
  const { users, setLoggedInUser } = useContext(UserContext);

  // Set form inputs and status variables
  const [formInputs, setFormInputs] = useState({
    userName: "",
    password: ""
  });
  const [failedLogIn, setFailedLogIn] = useState(false);
  const [userIsBanned, setUserIsBanned] = useState(false);

  // Function to be executed in the "onSubmit" method
  const handleSubmit = e => {
    e.preventDefault();

    // Find the logged in user among all users based on the entered login data
    const loggedInUser = users.find(
      user =>
        user.userName === formInputs.userName &&
        user.password === formInputs.password
    );

    // Check if the user is banned
    if (loggedInUser) {
      // If not, set the logged in user and redirect to the main page
      setLoggedInUser(loggedInUser);
      navigate("/");
    } else {
      // If the user is not found, set the "failedLogIn" status
      setFailedLogIn(true);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <label>
          UserName:
          <input
            type="text"
            name="userName"
            value={formInputs.userName}
            onChange={e =>
              setFormInputs({ ...formInputs, userName: e.target.value })
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formInputs.password}
            onChange={e =>
              setFormInputs({ ...formInputs, password: e.target.value })
            }
          />
        </label>
        <input type="submit" value="Log In" />
        {failedLogIn && <span>Wrong log in info</span>}
      </form>
    </div>
  );
};

export default SignIn;



