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

function Orders() {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/admin/vieworder')
            .then(res => {
                setOrder(res.data.Data);
                console.log(res.data.Data);

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
                            <StyledTableCell>Order Id</StyledTableCell>
                            <StyledTableCell>Order Date</StyledTableCell>
                            <StyledTableCell>Username</StyledTableCell>
                            <StyledTableCell>Contact</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Subtotal</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Orderitems</StyledTableCell>

                            {/* <StyledTableCell align="center">Actions</StyledTableCell>  */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.map((user, index) => (
                            <StyledTableRow key={user.orderid || index}>
                                <StyledTableCell>{user.orderid}</StyledTableCell>
                                <StyledTableCell>{user.orderdate}</StyledTableCell>
                                <StyledTableCell>{user.username}</StyledTableCell>
                                <StyledTableCell>{user.contact}</StyledTableCell>
                                <StyledTableCell>{user.email}</StyledTableCell>
                                <StyledTableCell>{user.subtotal}</StyledTableCell>
                                <StyledTableCell>{user.status}</StyledTableCell>
                                {/* <StyledTableCell>{user.orderitems}</StyledTableCell> */}
                                <StyledTableCell>
                                    {user.orderitems?.map((item, i) => (
                                        <div key={i}>
                                            Product ID: {item.productid}, Quantity: {item.quantity}
                                        </div>
                                    ))}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Orders;
