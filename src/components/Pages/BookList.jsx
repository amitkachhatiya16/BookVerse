import React, { useContext, useEffect, useState } from "react";
import "./Booklist.css";
import bookService from "../../services/bookService";
import WithAuth from "../../Layout/WithAuth";
import {
    Button,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Pagination,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import cartService from "../../services/cartService";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";

function BookList() {
    // const [book, setProducts] = useState([]);

    const Details = useContext(AuthContext);

    const FilterAtoZ = (e) => {
        var item = e.target.value;
        // console.log(item);
        if (item === "1") {
            setBooks([...books].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (item === "2") {
            setBooks([...books].sort((a, b) => b.name.localeCompare(a.name)));
        }
    };

    const defaultFilter = {
        pageIndex: 1,
        pagesize: 5,
        keyword: "",
    };
    // const [bookResponse, setBookResponse] = useState({
    //     pagelndex: 0,
    //     pagesize: 10,
    //     totalpages: 1,
    //     items: [],
    //     totalItems: 0,
    // });

    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState();
    const [filters, setFilters] = useState(defaultFilter);

    // useEffect(() => {
    //     getAllCategroies();
    // }, []);

    // const getAllCategroies = async () => {
    //     categoryService.getAll().then((res) => {
    //         if (res) {
    //             setBookResponse(res);
    //         }
    //     })
    // }

    const getBooks = () => {
        if (filters.keyword === "") {
            bookService.GetAllBooks(filters).then((response) => {
                if (response && response.status === 200) {
                    setBooks(response.data.result);
                }
            });
        } else {
            bookService.searchAllBooks(filters).then((response) => {
                if (response && response.status === 200) {
                    setBooks(response.data.result);
                }
            });
        }
    };
    useEffect(() => {
        getBooks({ ...filters });
    }, [filters]);

    const handleAddToCart = async (book) => {

        const Payload = {
                "bookId": book.id,
                "userId": localStorage.getItem("userId"),
                "quantity": 1
        }
        console.log("2323",Payload);

        await cartService.AddToCart(Payload)
            .then((response) => {
                //console.log("data added sucessfully");
                toast.success("Book Added to Cart", { position: "top-right" });
            })
            .catch((error) => {
                toast.error("Invalid !!!", { position: "top-right" })
                console.log(error)
    })

}

    return (
        <>
            <div id="main-container">
                <br />
                <br />
                <h1>All Books</h1>
                <br />

                <div id="top-container">
                    <div id="center-container">
                        <TextField
                            id="search"
                            type="search"
                            label="What You are looking for....."
                            onChange={(e) => {
                                setFilters({
                                    ...filters,
                                    keyword: e.target.value,
                                    pagelndex: 1,
                                });
                            }}
                            sx={{ width: 600 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div id="right-container">
                        <FormControl id="sort-botton">
                            <RadioGroup
                                row
                                aria-labelledby="Sort"
                                name="Sort"
                                onChange={(e) => FilterAtoZ(e)}
                            >
                                <FormControlLabel
                                    value="1"
                                    labelPlacement="bottom"
                                    control={<Radio />}
                                    label="A-Z"
                                />
                                <FormControlLabel
                                    value="2"
                                    labelPlacement="bottom"
                                    control={<Radio />}
                                    label="Z-A"
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>

                <br />

                <br />
                <div id="containt-container">
                    {books.map((book, index) => (
                        <div key={index}>
                            <div id="card-container">
                                <div id="card">
                                    <div>
                                        <img id="card-image" src={book.base64image} alt="" />
                                    </div>
                                    <div id="card-block">
                                        <h4>Book Name: {book.name}</h4>
                                        <h4>MRP:&#8377; {book.price}</h4>
                                        <h4>Category: {book.category}...</h4>
                                        {/* <p>{book.description}</p> */}
                                    </div>
                                    {Details.user.role === "buyer" && (<IconButton id='cartbtn' size="medium" color="Info" aria-label="add to shopping cart"
                                    onClick={() => handleAddToCart(book)}>
                                    &nbsp; &nbsp;<div><AddShoppingCartIcon /></div>&nbsp;&nbsp;
                                    </IconButton>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <Pagination id='pagi'
                    count={setBooks.totalpages}
                    onChange={(e, newPage) => {
                        setFilters({ ...filters, pagelndex: newPage });
                    }} /> */}
            </div>
        </>
    );
}
export default WithAuth(BookList);
