import React from "react";
import "./UserList.css";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div className="TableContainer">
      <table className="Table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button className="ActionButton edit" onClick={() => onEdit(user)}>Edit</button>
                <button className="ActionButton delete" onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
