const UserList = (props) => {
  const { styles, users, onDeleteUser } = props;

  const deleteHandler = (e) => {
    onDeleteUser(parseInt(e.target.dataset.id));
  };
  return (
    <div className={styles.list_container}>
      {users.length < 1 && <p>No users</p>}
      {users.length > 0 &&
        users.map((user) => (
          <div key={user.id} className={styles.list_item} data-id={user.id} onClick={deleteHandler}>
            <span>
              {user.name} (Age {user.age})
            </span>
          </div>
        ))}
    </div>
  );
};

export default UserList;
