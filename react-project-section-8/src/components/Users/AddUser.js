const AddUser = (props) => {
  const addUserHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={addUserHandler}>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" />
      <label htmlFor="age">Age</label>
      <input type="number" name="age" id="age" />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
