import UserContext from "../contexts/UserContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

  // Nustatome formos įvesties ir būsenos kintamuosius
  const [formInputs, setFormInputs] = useState({
    userName: '',
    password: '',
    passwordRepeat: '',
    avatar: ''
  });
  const [invalidUsername,] = useState(false);

  // Naudojame "useContext" Hook'ą, kad gautume prieigą prie "UserContext" ir nustatytume prisijungusį vartotoją
  const { users, addNewUser, setLoggedInUser } = useContext(UserContext);
  // Naudojame "useNavigate" Hook'ą, kad nukreiptume vartotoją į pagrindinį puslapį po sėkmingo registracijos
  const navigation = useNavigate();

  // Funkcija, kuri yra "onSubmit" metodo atlikimo funkcija
  const handleSubmit = (e) => {
    e.preventDefault();

    let isFormValid = true;
    let errorMessage = '';

    if (!formInputs.userName) {
      isFormValid = false;
      errorMessage = 'Username cannot be empty';
    } else if (users.find(user => user.userName === formInputs.userName)) {
      isFormValid = false;
      errorMessage = 'User with such name already exists';
    } else if (!formInputs.password || formInputs.password.length < 6) {
      isFormValid = false;
      errorMessage = 'Password must be at least 6 characters long';
    } else if (formInputs.password !== formInputs.passwordRepeat) {
      isFormValid = false;
      errorMessage = 'Passwords must match';
    }

    if (!isFormValid) {
      setErrorMessage(errorMessage);
      return;
    }

    let newUser = {
      ...formInputs,
      id: Date.now(),
      level: 'user',
      isBanned: false
    };

    addNewUser(newUser);
    setLoggedInUser(newUser);
    navigation('/');
  }

  const [errorMessage, setErrorMessage] = useState('');


  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          User name:
          <input className="form-input" type="text" name="userName" value={formInputs.userName}
            onChange={(e) => setFormInputs({ ...formInputs, userName: e.target.value })}
          />
        </label>
        <label className="form-label">
          Password:
          <input className="form-input" type="password" name="password" value={formInputs.password}
            onChange={(e) => setFormInputs({ ...formInputs, password: e.target.value })}
          />
        </label>
        <label className="form-label">
          Repeat Password:
          <input className="form-input" type="password" name="passwordRepeat" value={formInputs.passwordRepeat}
            onChange={(e) => setFormInputs({ ...formInputs, passwordRepeat: e.target.value })}
          />
        </label>
        <label className="form-label">
          User picture:
          <input className="form-input" type="url" name="avatar" value={formInputs.avatar}
            onChange={(e) => setFormInputs({ ...formInputs, avatar: e.target.value })}
          />
        </label>
        <input className="form-submit" type="submit" value="Register" />
      </form>
      {
        invalidUsername && <span className="form-error">User with such name already exists.</span>
      }
      <form className="form" onSubmit={handleSubmit}>
        {/* ... */}
      </form>
      {
        errorMessage && <span className="form-error">{errorMessage}</span>
      }
    </>
  );
}

export default Register;
