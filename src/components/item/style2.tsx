import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Item from "../interface/Item";
import { AppContext } from "../../App";
import { useContext } from "react";
import axios from "axios";

const DIV = styled.div`
    padding: 1rem;
    width: 250px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    margin: 0 0 1rem 0;
    .image {
        width: 150px;
        height: 150px;
        margin: 0 auto 1rem;
    }
    img {
        width: 100%;
        height: 100%;
    }
`;
const ALL = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const Style2 = () => {
    const contextValue = useContext(AppContext);
    const User = contextValue[1].UserCurrent;
    const Item = contextValue[2].AllItem;

    const load = () => {
        axios({
            url: `http://localhost:3306/item`,
            method: "get",
        }).then((result) => {
            contextValue[2].setAllItem(result.data);
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(load, []);

    return (
        <ALL>
            {Item.map((x: Item) => {
                return (
                    <DIV key={x.id}>
                        <div className="image">
                            <img src={x.ItemImage} alt="" />
                        </div>
                        <div>
                            <div>{x.ItemName}</div>
                            <div>{x.ItemDescription}</div>
                            <div>{x.ItemStatus}</div>
                            <div>{x.ItemPrice}</div>
                            <div>
                                <Link to={"detail/" + x.id}>
                                    More <i className="fas fa-arrow-circle-right"></i>
                                </Link>
                                {User == null ? (
                                    <div></div>
                                ) : (
                                    <Link
                                        to="/"
                                        onClick={() => contextValue[0].setIdItem([...contextValue[0].IdItem, x])}
                                    >
                                        Add to Cart <i className="fas fa-cart-plus"></i>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </DIV>
                );
            })}
        </ALL>
    );
};

export default Style2;
