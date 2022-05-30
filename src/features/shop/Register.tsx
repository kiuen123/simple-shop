import React from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { Button } from "@mui/material";
import { useHistory } from "react-router";

const REGISTER = styled.div`
    font-size: 1rem;
    margin: 0 auto;
    max-width: 1440px;
    display: flex;
    height: 95vh;
    overflow: auto;
    justify-content: center;
    h2 {
        display: flex;
        justify-content: center;
    }
    Form {
        padding: 1rem;
        background-color: #ffffff;
        border-radius: 1rem;
        top: 50%;
        left: 50%;
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
        // color: #ffffff;
    }
`;

const Register = () => {
    const history = useHistory();
    return (
        <REGISTER>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    image: "",
                    username: "",
                    role: "user",
                    boughtitem: [],
                }}
                onSubmit={(values) => {
                    if (values.image === "") {
                        values.image =
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLGxsb7+/vT09PJycn19fXq6urb29ve3t7w8PDOzs7n5+f5+fnt7e30nlkBAAAFHUlEQVR4nO2dC5qqMAyFMTwUBdz/bq+VYYrKKJCkOfXmXwHna5uTpA+KwnEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcA2iO9cdIc5PUdO257y+BU39u66b4HplE3fk6VIcnqmNfl1+gksr6+iIucjl3WYukor7+re6Hoe1y1UhNO3zUd+fUFRmKpOa0Tt6dY5ubRCrOG/QFLk1WGmnt/JxzykcjdZ/jyxJDLlOV2l36AtcsJJb9boG3YcR3DuqODIE3ztYKPkDdmwRmpUToUaSaq++AvRgZMWbOpbQW8hdCAm8ZDugoikzREdCJ2okJPBx6azFLNOwoOgcxojJ98JkaTSJxMpklKrCAKhZGI0drTY/wU5lXoJYibannV9NYy4oozNEAkPHTjop+DTDxVGkIgYJNoyQQJtiIW+EMjGAjm649AjGIaqswcEFQKJ2QPlJbqytki6ZXAAZRJ52J2McaUowzAfs+uFzrYhnzaapphiPWdaJWShqxjqa6kTTQ205TVbsfMa6htL0iYOsXpJrQjHSmCkv1QGPtiHqlYcQ21Gj7fcDU8xOEUuNgSltPzexh+HqFlanCBHZ4OLhCV+gK/3OF6vWvucLv98MUOY2pwu/PS/+D2qJU7pYGbOvDFDW+bbON9p3o3oRxn0bfLgZTgSn6pSfrtr56qLHemtHPTK2319SzGvtjQ9qeb39WgS66Cm073nd0U1PzDdJCO3Gzn6TKpl9Zq7ujGWsQhlA3NwWIMwG9zM08Y/tBrR9VWeczv5CSQuuUNKIUTk23ZJ5RKfVhjnkXotfWIlgX2BSCDYbZR+QTcLhb3dKZDUY2M0d4KWItwhHRah/zsrOgKw4wycwjcgEVcgQDQo23CqSiWEJkFAfod2oE1uIFdA1OsCPqFXYNTjCfb8Ez+iX2x5sKLlVbhtqdDcar9ZevhnbZxoBUD35k23t0d304LYs1ELVbnfFaZ/REJJX9niP8Q19moZGo3m8XR/yBvOnjFfsXcI2c8ZuNo7WMP5HQh6yRGrlmFOJTnyTcT+zRlqPUBI2gTVWNUzUna1ERgecgF4GpNBQ38jGqxVLzQA1A31Rrhk6Yz9QEh/WND0GnuG9huhiTXJkxfAizTHLr6cbJKN6UCU6x/2DTRE1xEeEXi3O0ZUqBN4nJRzHhFB1JPlFTBZlI2kQ8zc3KJ1Le8DIRmFJiknuVS6RK4Ej/JtBfJErDSzOBiY4wJHX6Z1I4v1GUmdCPNirnLLeg3oJLcbX5PcpHNbRvOa1A956QmRPOUXVF+zkaUJynpkYR0bOMJH2nNej1pqyV/aKkz9jr5yj5vrXXz1F5SQLACiMapmierj2ikLyleKdlA/I/2oFxiglxx9B+mHwz0lf34IZQfhDRhlD6bhvgEAoPYooHkTczSIZTLC+cEExsoNKZiGBiY9cCfo/Y/SjIOBMQizWWTe73CMUasJx7jlD+DdKdWUKoY4PRYFtGpO0G1Lx4RaadgTtJhf4fiGqGIwKWCGuGIwKWqP+7IxYCzygjR9IAO5pC7Da9g70TBVpWRNgFBlgT8RV2WxHbKwJMv4BOaEaYaU2K16yZMN/qgV+G7IWIvwyZCxHeDQMsR8wg0DBDDXB5H2EV+hkEGmaoySHQsEJNFoGGFWrAq98JRhUMX1iMMMqLLEIpK5jCbd4vw9nSt/72lewXiN6jmdjfq8Hdknlk92ZwJnbIMMRM7JBhiFlUFoHd1UWaP1QKsPsHA5mkNB+Smn9JqV3wskatnQAAAABJRU5ErkJggg==";
                    }
                    axios({
                        url: `http://localhost:3306/USER`,
                        method: "post",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        data: {
                            email: values.email,
                            password: values.password,
                            image: values.image,
                            username: values.username,
                            role: "user",
                            boughtitem: [],
                        },
                    });
                    history.push("/login");
                }}
            >
                {({ errors, touched, values }) => (
                    <Form>
                        <h2>Register</h2>
                        <p>Email</p>
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        <br />
                        <p>Username</p>
                        <Field name="username" />
                        <br />
                        <p>Password</p>
                        <Field name="password" type="password" />
                        {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                        <br />
                        <p>Confirm password</p>
                        <Field name="password" type="password" />
                        {errors.password && touched.password ? <div className="error">{errors.password}</div> : null}
                        <br />
                        <p>image</p>
                        <Field name="image" />
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <img src={values.image} width="50%" />
                        <br />
                        <Button type="submit">REGISTER</Button>
                    </Form>
                )}
            </Formik>
        </REGISTER>
    );
};

export default Register;
