import { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input!",
        message: "Please enter a valid username and age!",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age!",
        message: "Please enter a valid age! (1 or higher)",
      });
      return;
    }
    const user = {
      id: Math.random().toString(),
      name: enteredUsername,
      age: enteredAge,
    };
    props.onAddUser(user);
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const modalCloseHandler = () => {
    setError();
  };

  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onCloseModal={modalCloseHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" onChange={usernameChangeHandler} value={enteredUsername} />
          <label htmlFor="age">Age</label>
          <input type="number" name="age" id="age" onChange={ageChangeHandler} value={enteredAge} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
