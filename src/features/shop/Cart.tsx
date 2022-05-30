import React from "react";
import styled from "styled-components";
import Style1 from "../../components/item/style1";

const CART = styled.div`
    font-size: 1rem;
    margin: 0 auto;
    max-width: 1440px;
    background-color: #ffffff;
    padding: 1rem;
`;

const Cart = () => {
    return (
        <CART>
            <h2>Giỏ hàng</h2>
            <Style1 />
        </CART>
    );
};

export default Cart;
