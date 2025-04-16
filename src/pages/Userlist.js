import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Userlist() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/admin/viewuser')
      .then(res => {
        setUsers(res.data.data); // Make sure the API returns an array of user objects
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });
  }, []);

  return (
    <div style={{ margin: '20px' }}>
   

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Contact</StyledTableCell>
              <StyledTableCell>Username</StyledTableCell>
              {/* <StyledTableCell align="center">Actions</StyledTableCell>  */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user,index) => (
              <StyledTableRow key={user._id || user.id}>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.contact}</StyledTableCell>
                <StyledTableCell>{user.username}</StyledTableCell>
                {/* <StyledTableCell align="center">
                  <Button size="small" variant="outlined" sx={{ marginRight: 1 }}>Edit</Button>
                  <Button size="small" variant="outlined" color="error">Delete</Button>
                </StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Userlist;
