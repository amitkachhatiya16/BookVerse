import React, { useContext } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import './Login.css';
import {
    // Breadcrumbs,
    Button,
    // List,
    // ListItem,
    Typography,
    // Link,
    TextField,
    FormHelperText,
    Grid,
    Link,
    // Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Formik, Form } from "formik";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'
import authService from '../../services/authService';
import Cookies from "js-cookie";
import { AuthContext } from "../../context/authContext";

const Login = () => {

    const navigate = useNavigate();

    const userContext = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(8, "Enter valid Password.").required("Enter Valid Password."),
        email: Yup.string()
            .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Enter valid Email.")
            .required("Enter valid Email."),
    });

    const handleSubmit = async (values) => {

        const payload = {
            email: values.email,
            password: values.password,
        };

        await authService.Login(values).then(response => {
            if (response && response.status === 200) {
                toast.success("Login Successful", { position: "top-right" });
                navigate("/Books");
                Cookies.set("auth_email", values.email);
                userContext.setUser(response.data.result);
            }
        })
            .catch((error) => {
                toast.error("Invalid Details!!!", { position: "top-right" });
                console.log(error);
                console.log(payload);
            })
    }


    return (
            <div id="block1">
                <div id="components">
                    <Avatar sx={{ bgcolor: "#68251d" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    < Typography variant="h2" id="fontmain" >Login </Typography>
                    <br />
                    <Formik id="fontmain"
                        initialValues={{ email: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ values, setFieldValue, errors, handleBlur }) => {
                            console.log(errors);
                            return (
                                <Form id="form">

                                    <div >
                                        <div id="block">
                                            <TextField
                                                id="email"
                                                label="Enter Email"
                                                name="email"
                                                variant='filled'
                                                //autoComplate="off"
                                                value={values.email}
                                                //error={errors.email}
                                                onChange={(e) => setFieldValue("email", e.target.value)}
                                                onBlur={handleBlur}
                                            />

                                        </div>

                                        <div id="block">
                                            <TextField
                                                id="password"
                                                label="Enter Password"
                                                name="password"
                                                type="password"
                                                variant='filled'
                                                //autoComplate="off"
                                                value={values.password}
                                                //error={errors.password}
                                                onChange={(e) => setFieldValue("password", e.target.value)}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        <FormHelperText error>
                                            <ErrorMessage name="email" />
                                        </FormHelperText>
                                        <FormHelperText error>
                                            <ErrorMessage name="password" />
                                        </FormHelperText>

                                        <br />
                                        <div >
                                            <Button id="fontmain"
                                                type="submit"
                                                className="pink-btn btn"
                                                variant="contained"
                                                //disableElevation
                                                sx={{
                                                    ":hover": {
                                                        bgcolor: "#008094",
                                                        color: "white"
                                                    }
                                                }}
                                            >
                                                Login
                                            </Button>
                                        </div>
                                        <br />
                                        <br />
                                            <Grid>
                                                <Link id="font-main" href="/Registration" variant="h6">
                                                    {"Don't have an account? Register here"}
                                                </Link>
                                            </Grid>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        
    );
};
export default Login;