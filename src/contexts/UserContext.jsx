import { useEffect } from "react";
import { createContext, useState } from "react";

const UserContext = createContext ();

const UserProvider = ({ children }) =>{

    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser]= useState();

    useEffect(() => {
        const usersData= async () => {
            const res = await fetch('http://localhost:5000/users');
            const usersData = await res.json();
            setUsers(usersData);
        }
        usersData();
    }, []);

    const addNewUser = (newUser) =>{
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(usersData =>{
            setUsers([...users, newUser]);
        });
    }

    return(
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
