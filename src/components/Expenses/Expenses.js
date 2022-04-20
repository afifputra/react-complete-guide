import { useState } from "react";
import ExpensesList from "./ExpensesList";
import Card from "../UI/Card";
import ExpenseFilter from "../ExpenseFilter/ExpenseFilter";
import "./Expenses.css";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const selectedExpenseFilter = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.item.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  return (
    <div>
      <Card className="expenses">
        <ExpenseFilter onSelectedExpenseFilter={selectedExpenseFilter} selected={filteredYear} />
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
};

export default Expenses;
