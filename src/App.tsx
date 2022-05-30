import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./features/shop/Header";
import Home from "./features/shop/Home";
import NotFound from "./features/shop/NotFound";
import User from "./features/shop/User";
import Login from "./features/shop/Login";
import Register from "./features/shop/Register";
import Cart from "./features/shop/Cart";
import styled from "styled-components";
import USER from "./components/interface/User";
import Item from "./components/interface/Item";
import New from "./components/item/new";
import Detail from "./components/item/detail";
import Edit from "./components/item/edit";

export const AppContext = createContext<any>(null);
const DIV = styled.div``;
const App = () => {
    const [IdItem, setIdItem] = useState<Item[]>([]);
    const [UserCurrent, setUserCurrent] = useState<USER>();
    const [AllItem, setAllItem] = useState<Item[]>([]);
    const [AllUser, setAllUser] = useState<USER[]>([]);
    const [Item, setItem] = useState<Item[]>([]);
    const Userc = sessionStorage.getItem("key");

    return (
        <BrowserRouter>
            <AppContext.Provider
                value={[
                    { IdItem, setIdItem },
                    { UserCurrent, setUserCurrent },
                    { AllItem, setAllItem },
                    { AllUser, setAllUser },
                    { Item, setItem },
                ]}
            >
                <Header />
                <DIV>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/user">{Userc !== null ? <User /> : <Login />}</Route>
                        <Route path="/cart">{Userc !== null ? <Cart /> : <Login />}</Route>
                        <Route path="/detail/:id">
                            <Detail />
                        </Route>
                        <Route path="/edit/:id">{Userc !== null ? <Edit /> : <Login />}</Route>
                        <Route path="/newitem">{Userc !== null ? <New /> : <Login />}</Route>
                        {/* thêm vào trên dòng này */}
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </DIV>
            </AppContext.Provider>
        </BrowserRouter>
    );
};

export default App;
