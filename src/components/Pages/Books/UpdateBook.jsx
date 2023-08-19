import React, { useEffect, useState } from 'react'

import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Button, Input, MenuItem, Select, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import bookService from '../../../services/bookService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateBook.css';

export const UpdateBook = () => {

    const navigate = useNavigate()


    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [imageValue, setImageValue] = useState('');

    const [img, setImg] = useState("");

    const [cat, setCat] = useState([]);

    const URL = "https://book-e-sell-node-api.vercel.app/api"

    useEffect(() => {
        axios.get(`${URL}/category/all`).then((res) => {
            setCat(res.data.result)
            
            console.log("444",cat);
        }).catch(() => {
            console.log("data not found");
        })
    }, [])

    const addBookData = async (values) => {

        if(img){
            var image = img
        }
        else{
            // eslint-disable-next-line no-redeclare
            var image = imageValue
        }

        const payload = {
            "id": id,
            "name": values.bookname,
            "description": values.description,
            "price": values.price,
            "categoryId": values.category,
            "base64image": image,
        }

        console.log("888", payload);


        await bookService.UpdateBook(payload)
            .then((response) => {
                toast.success("Book updated", { postion: "top-right" })
                navigate("/BooksPage")
            })
            .catch((error) => {
                toast.error("Book not updated Something went wrong plz try again")
                console.log(error);
            })

    };
    const imgToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            if (file) {
                reader.readAsDataURL(file)
            }
            reader.onload = () => {
                setImg(reader.result)
            }
            // console.log(img);
        })

    }

    const handleImage = async (e, setFieldValue) => {
        const file = e.target.files[0]

            const base64Img = await imgToBase64(file)
            setFieldValue('image', base64Img)
            console.log(base64Img);

    }

    useState(() => {
        setName(localStorage.getItem("name"))
        setPrice(localStorage.getItem("price"))
        setId(localStorage.getItem("id"))
        setCategoryId(localStorage.getItem("category"))
        setDescription(localStorage.getItem("description"))
        setImageValue(localStorage.getItem("image"))
    })


    return (
        <>

            <div id="editbook-main-container">

                <Typography id="font-main"variant="h3"> Edit Book </Typography>

                <div>

                    <Formik initialValues={{ bookname: name, price: price, category: categoryId, image: '', description:description}}
                        onSubmit={(values) => { addBookData(values) }}>
                        {({ values, errors, setFieldValue, handleBlur }) => {
                            //console.log("val:", values)
                            console.log("error", errors)
                            return (
                                <Form id='editbook'>

                                    <div id="block">
                                        <br />
                                        <div>
                                            <h4>Book Name</h4>
                                        </div>
                                        <div>
                                            <TextField
                                                label="Enter Name of book"
                                                name="bookname"
                                                id="bookName"
                                                variant="filled"
                                                value={values.bookname}
                                                sx={{width: 350,}}
                                                onChange={(e) => {
                                                    setFieldValue("bookname", e.target.value)
                                                    
                                                }}
                                                onBlur={handleBlur} />
                                            <br />
                                            <br/>
                                            <h4>Book Price</h4>
                                            <TextField
                                                label="Price of book"
                                                name="price"
                                                variant="filled"
                                                value={values.price}
                                                onChange={(e) => setFieldValue("price", e.target.value)}
                                                onBlur={handleBlur} />
                                            
                                            <br />
                                        </div>
                                        <br />
                                        <div>
                                            <h4> Book Category</h4>
                                            
                                        </div>
                                        <div>
                                            <Select
                                                label="Category of book"
                                                name='category'
                                                id="bookCategory"
                                                variant="filled"
                                                value={values.category}
                                                
                                                onChange={(e) => setFieldValue("category", e.target.value)}
                                                onBlur={handleBlur} sx={{ width: 350 }}>
                                                {cat?.map((category, index) => {
                                                    return <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                                                })}
                                            </Select>
                                            <br/>
                                            <br/>
                                            <h4> Book Image</h4>
                                            <Input type='file'
                                                id="bookImage"
                                                name="image"
                                                value={values.image}
                                                onChange={(e) => { handleImage(e, setFieldValue) }}
                                                sx={{
                                                    width: 350,
                                                }}
                                            />
                                        </div>
                                        <br />
                                        <TextField
                                            id="standard-multiline-static"
                                            label="Description"
                                            name="description"
                                            multiline
                                            rows={4}
                                            value={values.description}
                                            variant="standard"
                                            onChange={(e) => setFieldValue("description", e.target.value)}
                                            onBlur={handleBlur}
                                        />

                                        <br />
                                        <br />
                                        <br />
                                        <div>
                                            <Button id="font-main"
                                                type="submit"
                                                className="pink-btn btn"
                                                variant="contained"
                                                disableElevation
                                                sx={{
                                                    ":hover": {
                                                        bgcolor: "#008094",
                                                        color: "white"
                                                    }
                                                }}
                                            >
                                                CHANGE
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </>
    )
}
