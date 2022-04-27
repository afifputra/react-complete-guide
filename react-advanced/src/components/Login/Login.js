import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import classes from "./Login.module.css";
import AuthContext from "../../context/auth-context";

const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: action.val.includes("@") };
    case "BLUR":
      return { value: state.value, isValid: state.value.includes("@") };
    case "CLEAR":
      return { value: "", isValid: null };
    default:
      return state;
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val, isValid: action.val.length >= 6 };
    case "BLUR":
      return { value: state.value, isValid: state.value.length >= 6 };
    case "CLEAR":
      return { value: "", isValid: null };
    default:
      return state;
  }
};

const Login = (props) => {
  const ctx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailState] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // useEffect(() => {
  //   console.log("EFFECT RUNNING");

  //   return () => {
  //     console.log("EFFECT CLEANUP");
  //   };
  // }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 1000);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmailState({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPasswordState({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(emailState.isValid && event.target.value.length > 6);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));
    dispatchEmailState({ type: "BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPasswordState({ type: "BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input ref={emailInputRef} id="email" type="email" label="E-Mail" isValid={emailIsValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        <Input ref={passwordInputRef} id="password" type="password" label="Password" isValid={passwordIsValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
