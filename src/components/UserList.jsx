// UserList.jsx
const UserList = ({ users, onRoleChange }) => {
  const handleRoleChange = (userId) => {
    onRoleChange(userId);
  };

  return (
    <div className="w-1/4 p-4">
      <h2 className="text-xl">Connected Users</h2>
      {users.map((user) => (
        <div key={user.id} className="flex justify-between">
          <span>{user.nickname}</span>
          <button onClick={() => handleRoleChange(user.id)}>
            {user.role === "editor" ? "Viewer" : "Editor"}
          </button>
        </div>
      ))}
    </div>
  );
};
export default UserList;
