import React, { useEffect, useState } from 'react';
import { Table, TableCell, TableContainer, TableHead, TableBody, TableRow, Button } from '@mui/material';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of registered users from the server
    axios
      .get('http://localhost:9002/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log('Error occurred while fetching users', error);
      });
  }, []);

  const handleBlockUser = (userId) => {
    axios
      .post(`http://localhost:9002/blockUser/${userId}`)
      .then((res) => {
        console.log('User blocked successfully');
        window.alert('User blocked successfully');
        // Update the users state to reflect the change in user status
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === userId ? { ...user, status: 'blocked' } : user))
        );
      })
      .catch((error) => {
        console.log('Error occurred while blocking user:', error);
      });
  };
  
  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:9002/delete/${userId}`)
      .then((response) => {
        console.log('User deleted successfully');
        window.alert('User deleted successfully');
        // Update the users state to remove the deleted user
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.log('Error occurred while deleting user:', error);
      });
  };

  return (
    <div>
      <h6 style={{ fontSize: '30px' }}>USER DETAILS</h6>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'black', fontSize: '40px' }}>NAME</TableCell>
              <TableCell style={{ color: 'black', fontSize: '40px' }}>EMAIL ID</TableCell>
              <TableCell style={{ color: 'black', fontSize: '40px' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleBlockUser(user._id)}>Block</Button>
                  <Button onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Admin;
