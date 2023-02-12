import { useEffect } from "react";
import { createContext, useState } from "react";

const UserContext = createContext ();

const UserProvider = ({ children }) => {

  // Būsena, kuri saugo vartotojus
  const [users, setUsers] = useState([]);

  // Būsena, kuri saugo prisijungusio vartotojo informaciją
  const [loggedInUser, setLoggedInUser]= useState();

  // Efektas, kuris paleidžiamas komponentui atsiradus. Gauna visus vartotojus iš serverio ir įrašo juos į `users` būseną
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch('http://localhost:5000/users');
      const usersData = await res.json();
      setUsers(usersData);
    };
    getUsers();
  }, []);

  // Funkcija, kuri leidžia pridėti naują vartotoją į serverį ir į `users` būseną
  const addNewUser = (newUser) => {
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(usersData =>{
      setUsers([...users, newUser]);
    });
  };

  return (
    // Vartotojų kontekstas
    <UserContext.Provider
      value={{
        users,
        loggedInUser,
        setLoggedInUser,
        addNewUser
      }}      
    >
      {children}
    </UserContext.Provider> 
  );
};

export { UserProvider };
export default UserContext;
