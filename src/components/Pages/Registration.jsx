import React, { useEffect, useState } from "react";
import { Button, FormHelperText, Grid, Link, MenuItem, TextField, Typography } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
// import authService from "./services/authService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Registration.css';
import Select from '@mui/material/Select';


const Registration = () => {
    // const [username, setUserName] = useState("");
    // const [password, setPassword] = useState("");
    // const [userdetails, setUserDetails] = useState({
    //     username: "",
    //     password: "",
    // });

    const [userData, setUserData] = useState();


    const getData = async () => {
        await axios.get(`https://book-e-sell-node-api.vercel.app/api/user/byId?id=${1201}`)
            .then(res => setUserData(res.data));
    }

    useEffect(() => {
        getData();
    }, []);

    console.log(userData)

    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required("username not be empty"),
        email: Yup.string().email().required("email not be empty"),
        rid: Yup.number().max(3),
        password: Yup.string().min(8).required("password must have 8 charcters").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Enter valid Password, ")
    })

    const URL = "https://book-e-sell-node-api.vercel.app/api/user";


    const handleSubmit = async (values) => {
        //console.log("userName: ", values.userName);
        //console.log("Password: ", values.password);

        const payload = {
            firstName: values.userName,
            lastName: values.lastName,
            email: values.email,
            roleId: values.rid,
            password: values.password,
        }

        axios.post(URL, payload).then((res) => {
            console.log("data added sucessfully");
            if (res) {
                toast("Data Added Successfully", { position: "top-right" });
                navigate('/');
            }
        }).catch(() => {
            toast.error("Unable to Submit Data!!!", { position: "top-right" })
            console.log("error occurs");
        })

        console.log(values);

    }

    // await axios.post('https://book-e-sell-node-api.vercel.app/api/user', payload)
    //     .then((response) => {
    //         console.log("data added sucessfully");
    //         toast.success("Data added sucessfully", { position: "top-center" })
    //         Navigate("/HomePage")
    //     })

    //     .catch((error) => {
    //         toast.error("Unable to Submit Data!!!", { position: "top-center" })
    //         console.log(error)
    //         // console.log(payload)
    //     })

    // // await authService.Register(payload).then((response) => {
    // //     console.log(response);
    // //     if(response && response.code === 200){
    // //         toast("Data Submitted");
    // //     }
    // // });

    return (
        <Formik initialValues={{ userName: "", lastName: "", rid: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}>
            {({ values, errors, setFieldValue, handleBlur }) => {
                //console.log("val:", values)
                //console.log("error", errors)
                return (
                    <Form id='reg'>
                        <div className="form-demo">
                            <Typography variant="h3" id="font-main"> Registeration Form </Typography>
                            <div id="block">
                                <TextField
                                    label="Name"
                                    name="userName"
                                    variant="filled"
                                    value={values.userName}
                                    onChange={(e) => setFieldValue("userName", e.target.value)}
                                    onBlur={handleBlur} />
                                <FormHelperText error>
                                    <ErrorMessage name='userName' />
                                </FormHelperText>
                                <br />
                                <TextField
                                    label="Lastname"
                                    name="lastName"
                                    variant="filled"
                                    value={values.lastName}
                                    onChange={(e) => setFieldValue("lastName", e.target.value)}
                                    onBlur={handleBlur} />
                                <FormHelperText error>
                                    <ErrorMessage name='lastName' />
                                </FormHelperText>

                                <br />
                                <Select
                                    label="Select Role"
                                    name="RoleID"
                                    variant="filled"
                                    value={values.rid}
                                    onChange={(e) => setFieldValue("rid", e.target.value)}
                                    onBlur={handleBlur} sx={{ width: 340 }}>
                                    <MenuItem value={2}>Seller</MenuItem>
                                    <MenuItem value={3}>Buyer</MenuItem>
                                </Select>
                                <FormHelperText error>
                                    <ErrorMessage name='RoleID' />
                                </FormHelperText>
                                <br />
                                <TextField
                                    label="Email"
                                    name="email"
                                    variant="filled"
                                    value={values.email}
                                    onChange={(e) => setFieldValue("email", e.target.value)}
                                    onBlur={handleBlur} />
                                <FormHelperText error>
                                    <ErrorMessage name='email' />
                                </FormHelperText>
                                <br />
                                <TextField
                                    label="Password"
                                    name="password"
                                    variant="filled"
                                    value={values.password}
                                    onChange={(e) => setFieldValue("password", e.target.value)}
                                    onBlur={handleBlur} />
                                <FormHelperText error>
                                    <ErrorMessage name='password' />
                                </FormHelperText>
                            </div>
                            <Button id="font-main" variant="contained" type="submit" sx={{
                                bgcolor: '#8d6e63',
                                ":hover": {
                                    bgcolor: "#8d6e63",
                                    color: "white"
                                }
                            }} >Submit</Button>
                        </div>
                        <br />

                        <div>
                            <br />
                            <Grid>
                                <Link id="font-main" href="/" variant="h6">
                                    {"Already Have an Account click here to login"}
                                </Link>
                            </Grid>
                        </div>
                    </Form>
                )
            }}
        </Formik>

    );
};
export default Registration