import { useState } from "react";

import AddUser from "./components/Users/AddUser";
import UserList from "./components/Users/UserList";

function App2() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (user) => {
    setUsersList((prevUsers) => {
      return [...prevUsers, user];
    });
  };

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UserList users={usersList} />
    </div>
  );
}

export default App2;
