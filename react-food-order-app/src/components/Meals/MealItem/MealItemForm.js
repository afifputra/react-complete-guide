import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountIsValid = useState(true);

  const inputAmount = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const amount = inputAmount.current.value;
    const amountNumber = +amount;
    if (amount.trim().length === 0 || amountNumber < 1 || amountNumber > 5) {
      amountIsValid(false);
      return;
    } else {
      props.onAddItem(amountNumber);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputAmount}
        label="Amount"
        input={{
          id: `amount_${props.id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          onWheel: (e) => e.target.blur(),
        }}
      />
      <button type="submit">+ Add</button>
      {!amountIsValid && <p>Please, enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
