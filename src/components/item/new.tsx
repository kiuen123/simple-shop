import { Button } from "@mui/material";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../App";

const DIV = styled.div`
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
    }
`;

const New = () => {
    const contextValue = useContext(AppContext);
    const User = contextValue[1].UserCurrent[0];
    const history = useHistory();
    return (
        <DIV>
            <Formik
                initialValues={{
                    ItemName: "",
                    ItemPrice: "",
                    ItemImage: "",
                    ItemDescription: "",
                    ItemStatus: "",
                    ItemIntroduce: "",
                    IdTSeller: 0,
                }}
                onSubmit={(values) => {
                    axios({
                        url: `http://localhost:3306/item`,
                        method: "post",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        data: {
                            ItemName: values.ItemName,
                            ItemPrice: values.ItemPrice,
                            ItemImage: values.ItemImage,
                            ItemDescription: values.ItemDescription,
                            ItemStatus: values.ItemStatus,
                            ItemIntroduce: values.ItemIntroduce,
                            IdTSeller: User.id,
                        },
                    });
                    history.push("/User");
                }}
            >
                {({ values }) => (
                    <Form>
                        <h2>Thêm sản phẩm</h2>
                        <p>Tên sản phẩm</p>
                        <Field name="ItemName" />
                        <br />
                        <p>Giá sản phẩm</p>
                        <Field name="ItemPrice" type="number" />
                        <br />
                        <p>Ảnh sản phẩm</p>
                        <Field name="ItemImage" />
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <img src={values.ItemImage} width="50%" />
                        <br />
                        <p>Tóm tắt thông tin</p>
                        <Field name="ItemDescription" />
                        <br />
                        <p>trạng thái sản phẩm</p>
                        <Field name="ItemStatus" />
                        <br />
                        <p>Giới thiệu sản phẩm</p>
                        <Field name="ItemIntroduce" />
                        <br />
                        <Button type="submit">ADD</Button>
                    </Form>
                )}
            </Formik>
        </DIV>
    );
};

export default New;
