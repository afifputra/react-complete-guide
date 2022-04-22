import { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const enteredName = useRef("");
  const enteredUserAge = useRef("");

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const name = enteredName.current.value;
    const age = enteredUserAge.current.value;
    if (name.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid input!",
        message: "Please enter a valid username and age!",
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: "Invalid age!",
        message: "Please enter a valid age! (1 or higher)",
      });
      return;
    }
    const user = {
      id: Math.random().toString(),
      name: name,
      age: age,
    };
    props.onAddUser(user);
    enteredName.current.value = "";
    enteredUserAge.current.value = "";
    // setEnteredUsername("");
    // setEnteredAge("");
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const modalCloseHandler = () => {
    setError();
  };

  return (
    <>
      {error && <ErrorModal title={error.title} message={error.message} onCloseModal={modalCloseHandler} />}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" ref={enteredName} />
          <label htmlFor="age">Age</label>
          <input type="number" name="age" id="age" ref={enteredUserAge} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
