import React from "react";
import styled from "styled-components";
import { AppContext } from "../../App";
import { useContext } from "react";
import Item from "../interface/Item";
import { Button } from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router";

const ALL = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: auto;
    height: 80vh;
    position: relative;
    img {
        width: 150px;
        height: 150px;
        margin: 0 1rem 0 0;
    }
    table {
        thead {
            background-color: #cd2122;
            color: #ffffff;
            tr {
                td {
                    padding: 1rem;
                }
            }
        }
        tr {
            td {
                padding: 1rem;
            }
        }
        tfoot {
            background-color: #cd2122;
            position: fixed;
            bottom: 0;
            color: #ffffff;
            button {
                color: #000000;
                background-color: #ffffff;
            }
        }
    }
`;
const Style1 = () => {
    const contextValue = useContext(AppContext);
    const IdItem = contextValue[0].IdItem;
    const history = useHistory();
    const User = contextValue[1].UserCurrent[0];
    var sum = 0;

    const bought = () => {
        axios({
            url: `http://localhost:3306/user/${User.id}`,
            method: "put",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                email: User.email,
                password: User.password,
                image: User.image,
                username: User.username,
                role: User.role,
                boughtitem: IdItem,
            },
        });
        history.push("/");
    };
    return (
        <ALL>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Tên sản phẩm</td>
                        <td>Tóm tắt</td>
                        <td>Giới thiệu</td>
                        <td>Trạng thái</td>
                        <td>Giá</td>
                        <td>Ảnh sản phẩm</td>
                    </tr>
                </thead>
                <tbody>
                    {IdItem.map((x: Item) => {
                        sum += parseInt(x.ItemPrice);
                        return (
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td>{x.ItemName}</td>
                                <td>{x.ItemDescription}</td>
                                <td>{x.ItemIntroduce}</td>
                                <td>{x.ItemStatus}</td>
                                <td>{x.ItemPrice}</td>
                                <td>
                                    <img src={x.ItemImage} alt="" />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Tổng tiền:</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td> {sum}</td>
                        <td></td>
                        <td>
                            <Button onClick={bought}>Thanh toán</Button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </ALL>
    );
};

export default Style1;
