import React, { useState } from "react";
import Container from "./components/my-own/Container";
import UserForm from "./components/my-own/UserForm";
import UserList from "./components/my-own/UserList";
import styles from "./main.module.css";

const DUMMY_USERS = [
  { id: 1, name: "John Doe", age: 32 },
  { id: 2, name: "Bob Smith", age: 33 },
];

function App() {
  const [users, setUsers] = useState(DUMMY_USERS);

  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  return (
    <div>
      <Container styles={styles}>
        <UserForm styles={styles} onAddUser={addUser} />
        <UserList styles={styles} users={users} onDeleteUser={deleteUser} />
      </Container>
    </div>
  );
}

export default App;
