import React, { useEffect, useState } from 'react'
import './BooksPage.css';
import bookService from '../../../services/bookService';
import WithAuth from '../../../Layout/WithAuth';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

function BooksPage() {

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

    const navigate = useNavigate()



    const [books, setBooks] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getBooks = () => {
        bookService.GetAllBooks().then((response) => {
            setBooks(response.data.result)

        })
    }

    useEffect(() => {
        getBooks();
    }, []);

    const deleteBook = (id) => {
        bookService.DeleteBook(id).then(() => {
            toast.success("Delete Sucsessfully")
            getBooks();
        })
    }

    const handleEdit = (id, name, price, categoryId, description, image) => {
        navigate("/UpdateBook")
        localStorage.setItem("name" , name)
        localStorage.setItem("price" , price)
        localStorage.setItem("id" , id)
        localStorage.setItem("category" , categoryId)
        localStorage.setItem("description" , description)
        localStorage.setItem("image" , image)
    }


    return (

        <>
            <div id='main-container' >
                <br />
                <br />
                <h1>List of Books</h1>
                <br />

                <div id='books-table'>
                    <TableContainer>
                        <Table>
                            <TableHead >
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell>Price</StyledTableCell>
                                    <StyledTableCell>Category</StyledTableCell>
                                    <StyledTableCell>Edit</StyledTableCell>
                                    <StyledTableCell>Delete</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {books
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((book, index) => {
                                        return <StyledTableRow
                                            key={index}>
                                            <StyledTableCell>{book.name}</StyledTableCell>
                                            <StyledTableCell>{book.price}</StyledTableCell>
                                            <StyledTableCell>{book.category}</StyledTableCell>
                                            <StyledTableCell>
                                                <Button
                                                    type='Edit'
                                                    variant='contained'
                                                    sx={{
                                                        color: "white",
                                                        bgcolor: "green",
                                                    }}
                                                onClick={()=> handleEdit(book.id, book.name, book.price, book.categoryId, book.description, book.base64image)}
                                                >Edit</Button>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Button
                                                    type='Delete'
                                                    variant='contained'
                                                    onClick={() => {
                                                        deleteBook(book.id);
                                                    }}
                                                    sx={{
                                                        color: "white",
                                                        bgcolor: "red",
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    }

                                    )}
                            </TableBody>

                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={books.length}
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
export default WithAuth(BooksPage);
