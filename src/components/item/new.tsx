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
                        <h2>Th??m s???n ph???m</h2>
                        <p>T??n s???n ph???m</p>
                        <Field name="ItemName" />
                        <br />
                        <p>Gi?? s???n ph???m</p>
                        <Field name="ItemPrice" type="number" />
                        <br />
                        <p>???nh s???n ph???m</p>
                        <Field name="ItemImage" />
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <img src={values.ItemImage} width="50%" />
                        <br />
                        <p>T??m t???t th??ng tin</p>
                        <Field name="ItemDescription" />
                        <br />
                        <p>tr???ng th??i s???n ph???m</p>
                        <Field name="ItemStatus" />
                        <br />
                        <p>Gi???i thi???u s???n ph???m</p>
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
