import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const SignIn = () => {
  // Naudokite "useNavigate" kintamąjį, kad nukreiptumėte vartotoją į pagrindinį puslapį sėkmingai prisijungus
  const navigate = useNavigate();

  // Naudokite "useContext" kintamąjį, kad gautumėte prieigą prie "UserContext" ir nustatytumėte prisijungusio vartotojo informaciją
  const { users, setLoggedInUser } = useContext(UserContext);

  // Nustatykite formos laukų ir būsenos kintamuosius
  const [formInputs, setFormInputs] = useState({
    userName: "",
    password: ""
  });
  const [failedLogIn, setFailedLogIn] = useState(false);
  const [userIsBanned, setUserIsBanned] = useState(false);

  // Funkcija, kuri bus vykdoma "onSubmit" metodo metu
  const handleSubmit = e => {
    e.preventDefault();

    // Raskite prisijungusio vartotojo duomenis tarp visų vartotojų pagal įvestus prisijungimo duomenis
    const loggedInUser = users.find(
      user =>
        user.userName === formInputs.userName &&
        user.password === formInputs.password
    );

    // Patikrinkite, ar vartotojas yra užblokuotas
    if (loggedInUser) {
      // Jei ne, nustatykite prisijungusio vartotojo informaciją ir nukreipkite į pagrindinį puslapį
      setLoggedInUser(loggedInUser);
      navigate("/");
    } else {
      // Jei vartotojas nerastas, nustatykite "failedLogIn" būseną
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



