import React, { useEffect, useState } from 'react'
import cartService from '../../services/cartService'
import { toast } from 'react-toastify';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
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


    const [books, setBooks] = useState([]);

    const getBooks = () => {
        cartService.GetCartList(localStorage.getItem("userId")).then((response) => {
            setBooks(response.data.result)
        })
    }

    useEffect(() => {
        getBooks();
    }, []);

    const DeleteItem = (id) => {

        cartService.RemoveItem(id).then(() => {
            toast.success("Removed from Cart");
            window.location.reload();
        })
    }

    const EditQuantity = async (book, inc) => {

        const currentCount = book.quantity;
        const quantity = inc ? currentCount + 1 : currentCount - 1;
        if (quantity === 0) {
            toast.error("Item quantity should not be zero");
            return;
        }

        const Payload = {
            "id": book.id,
            "bookId": book.book.id,
            "userId": (localStorage.getItem("userId")),
            "quantity": quantity
        }
        console.log("44433",Payload);
        cartService.UpdateItem(Payload).then(() => {
            toast.success("Item Updated Sucsessfully");
            window.location.reload();
        })
    }

    const ConfirmOrder = async () => {

        let cartIds = books.map((book) => book.id);

        const Payload = {
            "userId": (localStorage.getItem("userId")),
            cartIds,
        }

        await cartService.ConfirmOrder(Payload).then(() => {
            toast.success("Ordered Sucsessfully");
            window.location.reload();
        })
    }

    return (
        <div id='main-cart-container'>
            <br />
            <br />

            <div id='books-table'>
                
                <TableContainer>
                    <br />
                    <br />
                    <Table  >
                        <TableHead>
                            <TableRow >
                                <StyledTableCell><b>Id</b></StyledTableCell>
                                <StyledTableCell><b>Name</b></StyledTableCell>
                                <StyledTableCell><b>Category</b></StyledTableCell>
                                <StyledTableCell><b>Quantity</b></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell><b>Price</b></StyledTableCell>
                                <StyledTableCell><b>Delete</b></StyledTableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {books.map((book, index) => {
                                return <StyledTableRow
                                    key={index}>
                                    <TableCell>{book.book.id}</TableCell>
                                    <TableCell>{book.book.name}</TableCell>
                                    <TableCell>{book.book.category}</TableCell>
                                    <TableCell>
                                        <span >{book.quantity}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            sx={{
                                                color: "white",
                                                bgcolor: "orange",
                                                ":hover": {
                                                    color: "Black"
                                                }
                                            }}
                                            onClick={() => EditQuantity(book, false)}
                                        >
                                            -
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            sx={{
                                                color: "white",
                                                bgcolor: "Green",
                                                ":hover": {
                                                    color: "Black"
                                                }
                                            }}
                                            onClick={() => EditQuantity(book, true)}
                                        >
                                            +
                                        </Button>

                                    </TableCell>
                                    <TableCell>

                                        {book.book.price}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            type='Delete'
                                            variant='contained'
                                            onClick={() => {
                                                DeleteItem(book.id);
                                            }}
                                            sx={{
                                                color: "white",
                                                bgcolor: "red",
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </StyledTableRow>
                            }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    variant='outlined'
                    onClick={() => {
                        ConfirmOrder();
                    }}
                    sx={{
                        color: "white",
                        bgcolor: "#735a5a",
                        ":hover": {
                            bgcolor: "Green",
                            color: "white"
                        }
                    }}>
                    Confirm Order.
                </Button>
            </div>
        </div>
    )
}

export default Cart