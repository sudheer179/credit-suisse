import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {
    Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody,
    Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@material-ui/core';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [selectedId, changeId] = useState(null);
    const [open, setOpen] = useState(false);

    const deleteUser = (id) => {
        changeId(id);
        setOpen(true);
    }

    const loadData = () => {
        Axios.get("http://localhost:8080/users")
            .then(res => {
                const { data } = res.data;
                setUsers(data);
            });
    }

    const handleDelete = () => {
        Axios.delete(`http://localhost:8080/users/${selectedId}`).then(() => {
            loadData();
            setOpen(false);
        });
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <Container maxWidth="xl">
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to Delete User ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Typography variant="h4" style={{ marginTop: 50, marginBottom: 20 }} color="primary"> User List </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Mobile</strong></TableCell>
                            <TableCell><strong>Password</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map(({ _id, name, email, mobile, password }) => (
                                <TableRow>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{email}</TableCell>
                                    <TableCell>{mobile}</TableCell>
                                    <TableCell>{password}</TableCell>
                                    <TableCell><Button color="secondary" onClick={() => deleteUser(_id)} >Delete</Button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Users;