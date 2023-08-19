import React, { useContext, useEffect, useState } from 'react'
import './UserInfo.css';
// import WithAuth from '../Layout/WithAuth';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { AuthContext } from '../../../context/authContext';
import userService from '../../../services/userService';
import { useNavigate } from 'react-router-dom';

function UserInfo() {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 20,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const navigate = useNavigate();

    const User = useContext(AuthContext)
    const ID = User.user.id;

    const [users, setUsers] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getUsers = () => {
        userService.GetAllUsers().then((response) => {
            setUsers(response.data.result)

        })
    }

    const deleteUser = (id) => {
        userService.DeleteUser(id).then(() => {
            toast.success("Delete Successfully")
            getUsers();
        })
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleEdit = (id, email, firstName, lastName, roleId, password) => {
        navigate("/EditUser")
        localStorage.setItem("id" , id)
        localStorage.setItem("email" , email)
        localStorage.setItem("firstName" , firstName)
        localStorage.setItem("lastName" , lastName)
        localStorage.setItem("roleId" , roleId)
        localStorage.setItem("password" , password)
        
    }

    return (

        <>
            <div id='main1-container' >
                <br />
                <br />
                <h1>All Users List</h1>
                <br />

                <div id='users-table'>
                    <TableContainer>
                        <Table>
                            <TableHead >
                                <TableRow>
                                    <StyledTableCell>First Name</StyledTableCell>
                                    <StyledTableCell>Email</StyledTableCell>
                                    <StyledTableCell>Role</StyledTableCell>
                                    <StyledTableCell>Edit</StyledTableCell>
                                    <StyledTableCell>Delete</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((user, index) => {
                                        return <StyledTableRow
                                            key={index}>
                                            <StyledTableCell>{user.firstName}</StyledTableCell>
                                            <StyledTableCell>{user.email}</StyledTableCell>
                                            <StyledTableCell>{user.role}</StyledTableCell>
                                            <StyledTableCell>
                                                <Button
                                                    type='Edit'
                                                    variant='contained'
                                                    sx={{
                                                        color: "white",
                                                        bgcolor: "green",
                                                    }}
                                                    onClick={() => handleEdit(user.id , user.email, user.firstName, user.lastName, user.roleId, user.password)}
                                                >Edit</Button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {ID !== (user.id) && (
                                                    <Button
                                                        type='Delete'
                                                        variant='contained'
                                                        onClick={() => {
                                                            deleteUser(user.id);
                                                        }}
                                                        sx={{
                                                            color: "white",
                                                            bgcolor: "red",
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>)}

                                            </StyledTableCell>
                                        </StyledTableRow>
                                    }

                                    )}
                            </TableBody>

                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={users.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </>
    )
}
export default UserInfo;
