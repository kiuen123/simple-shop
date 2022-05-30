import { Button } from "@mui/material";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useContext, useEffect } from "react";
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

const Edit = () => {
    const contextValue = useContext(AppContext);
    const User = contextValue[1].UserCurrent[0];
    const ItemDetail = contextValue[4].Item;

    const history = useHistory();
    const x = window.location.href;
    const a = x.split("/");

    const loadDetail = () => {
        axios({
            url: `http://localhost:3306/item`,
            method: "get",
            params: {
                id: parseInt(a[4]),
            },
        }).then((result) => {
            contextValue[4].setItem(result.data);
        });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(loadDetail, []);

    const cancel = () => {
        history.push("/user/item");
    };

    return (
        <DIV>
            {ItemDetail.map((x: any) => {
                return (
                    <Formik
                        initialValues={{
                            ItemName: x.ItemName,
                            ItemPrice: x.ItemPrice,
                            ItemImage: x.ItemImage,
                            ItemDescription: x.ItemDescription,
                            ItemStatus: x.ItemStatus,
                            ItemIntroduce: x.ItemIntroduce,
                            IdTSeller: x.IdTSeller,
                        }}
                        onSubmit={(values) => {
                            axios({
                                url: `http://localhost:3306/item/${ItemDetail.id}`,
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
                            history.push("/user/item");
                        }}
                    >
                        {({ values }) => (
                            <Form>
                                <h2>Thêm sản phẩm</h2>
                                <p>Tên sản phẩm:</p>
                                <Field name="ItemName" />
                                <br />
                                <p>Giá sản phẩm: </p>
                                <Field name="ItemPrice" type="number" />
                                <br />
                                <p>Ảnh sản phẩm </p>
                                <Field name="ItemImage" />
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <img src={values.ItemImage} width="50%" />
                                <br />
                                <p>Tóm tắt thông tin: </p>
                                <Field name="ItemDescription" />
                                <br />
                                <p>trạng thái sản phẩm: </p>
                                <Field name="ItemStatus" />
                                <br />
                                <p>Giới thiệu sản phẩm:</p>
                                <Field name="ItemIntroduce" />
                                <br />
                                <Button type="submit">ADD</Button>
                                <Button onClick={cancel}>Cancel</Button>
                            </Form>
                        )}
                    </Formik>
                );
            })}
        </DIV>
    );
};

export default Edit;
