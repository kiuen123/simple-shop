import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../App";

const DIV = styled.div`
    font-size: 1rem;
    margin: 0 auto;
    max-width: 1440px;
    display: flex;
    .ShowItem {
        margin: 0 0 0 1rem;
        background-color: #ffffff;
        width: 100%;
        padding: 1rem;
        height: 95vh;
        overflow: auto;
        .all {
            display: flex;
        }
    }
`;

const Detail = () => {
    const contextValue = useContext(AppContext);
    const User = contextValue[1].UserCurrent;
    const ItemDetail = contextValue[4].Item;
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

    return (
        <DIV>
            {ItemDetail.map((x: any) => {
                return (
                    <div className="ShowItem" key={x.id}>
                        <h2>{x.ItemName}</h2>
                        <div className="all">
                            <img src={x.ItemImage} alt="" width="25%" />
                            <div>
                                <p>Giới thiệu: {x.ItemIntroduce}</p>
                                <p>Giá: {x.ItemPrice}</p>
                                <p>Trạng thái: {x.ItemStatus}</p>
                                {User == null ? (
                                    <div></div>
                                ) : (
                                    <Link
                                        to={"detail/" + x.id}
                                        onClick={() => contextValue[0].setIdItem([...contextValue[0].IdItem, x])}
                                    >
                                        Add to Cart <i className="fas fa-cart-plus"></i>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </DIV>
    );
};

export default Detail;
