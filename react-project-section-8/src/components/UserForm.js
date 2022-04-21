import { useState } from "react";

const UserForm = (props) => {
  const { styles, onAddUser } = props;
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const ageHandler = (e) => {
    setAge(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (username.trim().length === 0) {
      alert("Username is required");
      return;
    }
    if (age.trim().length === 0) {
      alert("Age is required");
      return;
    }
    if (parseInt(age) < 0) {
      alert("Age must be < 0");
      return;
    }
    const newUser = {
      id: Math.floor(Math.random() * 100),
      name: username,
      age: age,
    };
    onAddUser(newUser);
    setUsername("");
    setAge("");
  };

  return (
    <form className={styles.form_container} onSubmit={submitHandler}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" value={username} onChange={usernameHandler} />
      <label htmlFor="age">Age</label>
      <input type="number" id="age" value={age} onChange={ageHandler} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
