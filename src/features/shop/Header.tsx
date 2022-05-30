import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";

const HEAD = styled.div`
    background-color: #cd2122;
    padding: 1rem;
    font-size: 1.05rem;
    .all {
        margin: 0 auto;
        max-width: 1440px;
        display: flex;
        color: #ffffff;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: center;
        .LogoArea {
            display: flex;
            align-items: center;
            .logo {
                color: #ffffff;
                margin: 0 0.25rem;
                font-weight: bold;
            }
        }
        .LogArea {
            display: flex;
            align-items: center;
            .use {
                display: flex;
            }
            .log {
                color: #ffffff;
                margin: 0 0.25rem;
                display: flex;
            }
        }
    }
`;

const Header = () => {
    const contextValue = useContext(AppContext);
    const User = contextValue[1].UserCurrent;
    const IdItem = contextValue[0].IdItem;

    return (
        <HEAD>
            <div className="all">
                <div className="LogoArea">
                    <Link to="/" className="log logo">
                        <img src="#" alt="" />
                    </Link>
                    <Link to="/" className="log logo">
                        COMPUTER SHOP
                    </Link>
                </div>

                <div className="LogArea">
                    {User === undefined ? (
                        // chưa đăng nhập
                        <div>
                            <Link to="/login" className="log">
                                Login
                            </Link>
                            /
                            <Link to="/register" className="log">
                                Register
                            </Link>
                        </div>
                    ) : (
                        // đã đăng nhập
                        <div className="use">
                            <Link to="/cart" className="log">
                                <i className="fas fa-shopping-cart"></i>
                                <p>{IdItem.length}</p>
                            </Link>
                            <Link to="/user" className="log">
                                <i className="fas fa-user"></i>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </HEAD>
    );
};

export default Header;
