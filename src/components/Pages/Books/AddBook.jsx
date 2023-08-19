import React, { useState } from 'react'
import bookService from '../../../services/bookService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import { Button, FormHelperText, Input, MenuItem, Select, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import './AddBook.css'
// import { Navigate } from 'react-router-dom';

export const AddBook = () => {


    const navigate = useNavigate();

    const [img, setImg] = useState("");

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

    const handleImage = async(e, setFieldValue) => {
        const file = e.target.files[0]

        const base64Img = await imgToBase64(file)
        setFieldValue('bookImage', base64Img)

    }

    const Submit = async (values) => {

        const payload = {

            "name": values.bookName,
            "description": values.description,
            "price": values.price,
            "categoryId": values.categoryId,
            "base64image": img,
        };


        await bookService.AddNewBook(payload).then((response) => {
            if (response) {
                toast.success("Book Added Successfully");
                navigate("/Books");
            }
            else {
                toast.error("Unable to add book please try Again!!!");
            }
        });

    }


    return (
        <>
        <div id="Addbook-main-container">
            <Formik initialValues={{ bookName: "", description: "", price: "", categoryId: "", bookImage: "" }}
                onSubmit={(values) => Submit(values)}>
                {({ values, errors, setFieldValue, handleBlur }) => {
                    //console.log("val:", values)
                    //console.log("error", errors)
                    return (
                        <Form id='Addbook'>
                            <div className="form-demo">
                                <Typography id="font-main" variant="h3"> Add New Book </Typography>
                                <div id="block">
                                    <TextField
                                        label="Book Name"
                                        name="bookName"
                                        variant="filled"
                                        value={values.bookName}
                                        sx={{width: 350,}}
                                        onChange={(e) => setFieldValue("bookName", e.target.value)}
                                        onBlur={handleBlur} />
                                    <FormHelperText error>
                                        <ErrorMessage name='bookName' />
                                    </FormHelperText>
                                    <br />
                                    <br />
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Description"
                                        name="description"
                                        multiline
                                        rows={4}
                                        value={values.description}
                                        variant="standard"
                                        sx={{width: 350,}}
                                        onChange={(e) => setFieldValue("description",e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                    <br/>
                                    <br/>
                                    <TextField
                                        label="Price of book"
                                        name="price"
                                        variant="filled"
                                        value={values.price}
                                        sx={{width: 350,}}
                                        onChange={(e) => setFieldValue("price", e.target.value)}
                                        onBlur={handleBlur} />
                                    <FormHelperText error>
                                        <ErrorMessage name='price' />
                                    </FormHelperText>
                                    <br/>
                                    <br/>
                                    <Select
                                        label="Category of book"
                                        name="category"
                                        variant="filled"
                                        value={values.categoryId}
                                        onChange={(e) => setFieldValue("categoryId", e.target.value)}
                                        onBlur={handleBlur} sx={{ width: 350 }}>
                                        <MenuItem value={2}>Historical Fiction</MenuItem>
                                        <MenuItem value={3}>Fantasy</MenuItem>
                                        <MenuItem value={4}>Horror</MenuItem>
                                        <MenuItem value={5}>Thriller</MenuItem>
                                        <MenuItem value={6}>Essayyyy</MenuItem>
                                        <MenuItem value={7}>Graphic novel</MenuItem>
                                        <MenuItem value={8}>Comic book</MenuItem>
                                        <MenuItem value={9}>Spirituality</MenuItem>
                                        <MenuItem value={10}>Temp Category</MenuItem>
                                        <MenuItem value={11}>Essay New</MenuItem>
                                    </Select>
                                    <FormHelperText error>
                                        <ErrorMessage name='categoryId' />
                                    </FormHelperText>
                                    <br />
                                    <br />

                                    <Input type='file'
                                            id="bookImage"
                                            name="bookImage"
                                            onChange={(e) => {handleImage(e, setFieldValue)}}
                                            sx={{
                                                width: 350,
                                            }}
                                        />
                                        <br/>
                                        <br/>
                                        <br/>
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
                                        ADD
                                        </Button>
                                
                                </div>
                                
                            </div>
                        </Form>
                    )
                }}
            </Formik>
            </div>
        </>

    )
};

export default AddBook;