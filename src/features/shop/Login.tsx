import React from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import { AppContext } from "../../App";
import { useContext } from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router";
import axios from "axios";

const LOGIN = styled.div`
    font-size: 1rem;
    margin: 0 auto;
    max-width: 1440px;
    display: flex;
    justify-content: center;
    height: 80vh;
    h2 {
        display: flex;
        justify-content: center;
    }
    Form {
        padding: 1rem;
        background-color: #ffffff;
        border-radius: 1rem;
        width: 500px;
        * {
            padding: 0.5rem;
            margin: 0.5rem;
            width: 100%;
            border-radius: 1rem;
        }
    }
    .error {
        color: red;
    }
    Button {
        background-color: #cd2122;
    }
`;

const Login = () => {
    const contextValue = useContext(AppContext);
    const history = useHistory();
    return (
        <LOGIN>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={(values) => {
                    axios({
                        url: `http://localhost:3306/USER`,
                        method: "get",
                        params: {
                            email: values.email,
                            password: values.password,
                        },
                    }).then((result) => {
                        if (result.data[0] !== undefined) {
                            if (result.data[0].email === values.email && result.data[0].password === values.password) {
                                sessionStorage.setItem("key", "done");
                                contextValue[1].setUserCurrent(result.data);
                                history.push("/");
                            }
                        } else {
                            alert("sai email hoặc mật khẩu");
                        }
                    });
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <h2>Login</h2>
                        <p>Email</p>
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        <br />
                        <p>Password</p>
                        <Field name="password" type="password" />
                        {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                        <br />
                        <Button type="submit">LOGIN</Button>
                    </Form>
                )}
            </Formik>
        </LOGIN>
    );
};

export default Login;
