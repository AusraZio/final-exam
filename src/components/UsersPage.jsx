import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import UserCard from "./UserCard";

const UsersPage = () => {

  // Naudodami useContext "users" ir "banOrUnbanUser" konstantas ištraukiame iš UserContext duomenis
  const { users, banOrUnbanUser } = useContext(UserContext);

  // Susikuriame naują masyvą iš vartotojų, kurie nėra administratoriai
  const nonAdminUsers = users.filter(user => user.level !== 'admin');

  return (
    <>
      {/* Renderiame UserCard komponentus kiekvienam nonAdminUsers masyvo vartotojui */}
      {
        nonAdminUsers.map(user =>
          <UserCard
            key={user.id}
            data={user}
            banOrUnbanUser={banOrUnbanUser}
          />
        )
      }
    </>
  );
}

export default UsersPage;