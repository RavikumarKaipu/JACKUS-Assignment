import React, { useState, useEffect } from "react";
import axios from "./utils/api";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      alert("Failed to fetch users.");
    }
  };

  const addUser = async (newUser) => {
    try {
      const response = await axios.post("/users", newUser);
      setUsers([ ...users,response.data]);
    } catch (error) {
      alert("Failed to add user.");
    }
  };

  const editUser = async (updatedUser) => {
    try {
      const response = await axios.put(`/users/${updatedUser.id}`, updatedUser);
      setUsers(users.map((user) => (user.id === updatedUser.id ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      alert("Failed to update user.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <UserForm
        onSave={editingUser ? editUser : addUser}
        editingUser={editingUser}
        onCancel={() => setEditingUser(null)}
      />
      <UserList users={users} onEdit={setEditingUser} onDelete={deleteUser} />
    </div>
  );
}

export default App;
