import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import userService from '../services/userService';
import { toast } from 'react-toastify';
import { MenuItem, Select, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Button } from '@mui/material';
import './EditUser.css';

const EditUser = () => {

    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [roleId, setRoleId] = useState("");
    const [password, setPassword] = useState("");

    const [role, setRole] = useState('')


    // const [rol, setrol] = useState([]);

    const URL = "https://book-e-sell-node-api.vercel.app/api"

    // useEffect(() => {
    //     axios.get(`${URL}/user/all`).then((res) => {
    //         setrol(res.data.result)
    //         console.log("444", rol);

    //     }).catch(() => {
    //         console.log("data not found"); 
    //     })
    // }, []);

    const addUserData = async (values) => {

        if (values.roleId === 1) {
            setRole("admin")
        } else if (values.roleId === 2) {
            setRole("seller")
        } else {
            setRole("buyer")
        }


        const payload = {
            "id": id,
            "email": values.email,
            "firstName": values.firstName,
            "lastName": values.lastName,
            "roleId": values.roleId,
            "role": role,
            "password": values.password,
        }
        // const payload = {
        //     "id": 12,
        //     "email": "testingguser@gmail.com",
        //     "firstName": "testiinggg",
        //     "lastName": "test",
        //     "roleId": 2,
        //     "role": "seller",
        //     "password": "tests"
        // }

        console.log("55555", payload)

        axios.put(`${URL}/user`, payload).then((res) => {
            toast("User updated")
        }).catch(() => {
            toast("User not updated")
            console.log("Book cannot add");
        })

        // await userService.EditUserInfo(payload)
        //     .then((response) => {
        //         toast.success("user Details updated", { postion: "top-right" })
        //         navigate("/UserInfo");
        //     })
        //     .catch((error) => {
        //         toast.error("Something went wrong Please try Again!!!")
        //         console.log(error);
        //     })
    }

    useState(() => {
        setId(localStorage.getItem("id"))
        setEmail(localStorage.getItem("email"))
        setFirstName(localStorage.getItem("firstName"))
        setLastName(localStorage.getItem("lastName"))
        setRoleId(localStorage.getItem("roleId"))
        setPassword(localStorage.getItem("password"))
    })



    return (
        <>
            <div id="edituser-main-component">
                <Typography id="font-main" variant="h3"> Edit User </Typography>

                <div>
                    <Formik initialValues={{ email: email, firstName: firstName, lastName: lastName, roleId: roleId, password: password }}
                        onSubmit={(values) => { addUserData(values) }}>
                        {({ values, error, setFieldValue, handleBlur }) => {
                            return (
                                <Form id="usereditform">

                                    <br />
                                    <br />

                                    <TextField
                                        label="Email"
                                        name="email"
                                        id="email"
                                        variant="filled"
                                        value={values.email}
                                        sx={{width: 400,}}
                                        onChange={(e) => {

                                            setFieldValue("email", e.target.value)

                                        }}
                                        onBlur={handleBlur} />
                                    <br />
                                    <br />
                                    <TextField
                                        label="First Name"
                                        name="firstName"
                                        id="firstName"
                                        variant="filled"
                                        value={values.firstName}
                                        sx={{width: 400,}}
                                        onChange={(e) => {

                                            setFieldValue("firstName", e.target.value)

                                        }}
                                        onBlur={handleBlur} />
                                    <br />
                                    <br />
                                    <TextField
                                        label="Last Name"
                                        name="lastName"
                                        id="lastName"
                                        variant="filled"
                                        value={values.lastName}
                                        sx={{width: 400,}}
                                        onChange={(e) => {

                                            setFieldValue("lastName", e.target.value)

                                        }}
                                        onBlur={handleBlur} />
                                    <br />
                                    <br />
                                    <Select label="Role of User"
                                        name='roleId'
                                        variant="filled"
                                        value={values.roleId}
                                        
                                        onChange={(e) => setFieldValue("roleId", e.target.value)}
                                        onBlur={handleBlur} sx={{ width: 400 }}>
                                        <MenuItem value={1}>Admin</MenuItem>
                                        <MenuItem value={2}>Seller</MenuItem>
                                        <MenuItem value={3}>Buyer</MenuItem>
                                    </Select>
                                    <br />
                                    <br />
                                    <TextField 
                                    label="Password" 
                                    name='password'
                                    variant="filled"
                                    value={values.password}
                                    sx={{width: 400,}} 
                                    onChange={(e) => { setFieldValue("password", e.target.value) }} />
                                    <br />
                                    <br />
                                    <br />

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
                                </Form>
                            )
                        }}

                    </Formik>
                </div>

            </div>
        </>
    )
}

export default EditUser
