import React, { useState } from "react";
import Container from "./components/Container";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import styles from "./main.module.css";

const DUMMY_USERS = [
  { id: 1, name: "John Doe", age: 32 },
  { id: 2, name: "Bob Smith", age: 33 },
];

function App() {
  const [users, setUsers] = useState(DUMMY_USERS);
  const [currentId, setCurrentId] = useState(null);

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
