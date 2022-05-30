import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../../App";
import Item from "../../components/interface/Item";
import { useHistory } from "react-router";

const ALL = styled.div`
    font-size: 1rem;
    margin: 0 auto;
    padding: 1rem;
    max-width: 1440px;
    display: flex;
`;
const TAB = styled.div`
    width: 20%;
    background-color: #ffffff;
    padding: 1rem;
    margin: 0 1rem 0 0;
    overflow: auto;
    height: 97vh;
    a {
        background-color: #cd2122;
        color: #ffffff;
        padding: 1rem;
        margin: 0 0 1rem 0;
        display: block;
    }
`;
const CONTENT = styled.div`
    font-size: 1rem;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 1rem;
    position: relative;
    width: 80%;
`;
const USER = styled.div`
    overflow: auto;
    height: 97vh;
    .user {
        display: flex;
        width: 100%;
        padding: 1rem;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        position: relative;
        img {
            width: 200px;
            height: 200px;
            margin: 0 1rem 0 0;
        }
    }
    .bought {
        display: flex;
        flex-wrap: wrap;
    }
`;
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
const ADMIN = styled.div`
    overflow: auto;
    height: 90vh;
    img {
        width: 200px;
        height: 200px;
        margin: 0 1rem 0 0;
    }
    table {
        thead {
            background-color: #cd2122;
            color: #ffffff;
        }
        tr {
            td {
                width: 25%;
                padding: 1rem;
            }
        }
    }
`;
const USER2 = styled.div`
    overflow: auto;
    height: 90vh;
    img {
        width: 200px;
        height: 200px;
        margin: 0 1rem 0 0;
    }
    table {
        thead {
            background-color: #cd2122;
            color: #ffffff;
        }
        tr {
            td {
                width: 25%;
                padding: 1rem;
            }
        }
    }
`;
const SELLER = styled.div`
    overflow: auto;
    height: 90vh;
    img {
        width: 200px;
        height: 200px;
        margin: 0 1rem 0 0;
    }
    table {
        thead {
            background-color: #cd2122;
            color: #ffffff;
        }
        tr {
            td {
                width: 25%;
                padding: 1rem;
            }
        }
    }
`;
const ITEM = styled.div`
    overflow: auto;
    height: 90vh;
    img {
        width: 150px;
        height: 150px;
        margin: 0 1rem 0 0;
    }
    table {
        thead {
            background-color: #cd2122;
            color: #ffffff;
        }
        tr {
            td {
                padding: 1rem;
            }
        }
    }
`;

const User = () => {
    const contextValue = useContext(AppContext);
    const User = contextValue[1].UserCurrent[0];

    return (
        <ALL>
            <TAB>
                <Link to="/user">DashBoard</Link>
                {User.role === "superadmin" ? (
                    <Link to="/user/admin" className="log">
                        Quản lí admin
                    </Link>
                ) : (
                    <div></div>
                )}
                {User.role === "admin" || User.role === "superadmin" ? (
                    <>
                        <Link to="/user/user" className="log">
                            Quản lí người dùng
                        </Link>
                        <Link to="/user/seller" className="log">
                            quản lí người bán hàng
                        </Link>
                    </>
                ) : (
                    <div></div>
                )}
                {User.role === "seller" || User.role === "admin" || User.role === "superadmin" ? (
                    <Link to="/user/item" className="log">
                        quản lí sản phẩm
                    </Link>
                ) : (
                    <div></div>
                )}
            </TAB>
            <CONTENT>
                <Switch>
                    <Route exact path="/user">
                        <MySite />
                    </Route>
                    <Route path="/user/admin">{User.role === "superadmin" ? <AdminSite /> : <div></div>}</Route>
                    <Route path="/user/user">
                        {User.role === "admin" || User.role === "superadmin" ? <UserSite /> : <div></div>}
                    </Route>
                    <Route path="/user/item">
                        {User.role === "seller" || User.role === "admin" || User.role === "superadmin" ? (
                            <ItemSite />
                        ) : (
                            <div></div>
                        )}
                    </Route>
                    <Route path="/user/seller">
                        {User.role === "admin" || User.role === "superadmin" ? <SellerSite /> : <div></div>}
                    </Route>
                </Switch>
            </CONTENT>
        </ALL>
    );
};

const MySite = () => {
    const contextValue = useContext(AppContext);
    const history = useHistory();
    const User = contextValue[1].UserCurrent[0];

    const addseller = () => {
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
                role: "seller",
                boughtitem: User.boughtitem,
            },
        });
        history.push("/");
    };

    return (
        <USER>
            <div className="user">
                <img src={User.image} alt="" />
                <div>
                    <div>Name: {User.username}</div>
                    <div>Email: {User.email}</div>
                    {User.role === "user" ? (
                        <>
                            <br />
                            <a onClick={addseller} href="http://localhost:3000/login">
                                đăng kí làm người bán hàng
                            </a>
                            <br />
                        </>
                    ) : (
                        <div></div>
                    )}
                    <a href="http://localhost:3000/">Đăng xuất</a>
                </div>
            </div>
            <hr />
            <h2>Sản phẩm mua gần nhất</h2>
            <div className="bought">
                {User.boughtitem.map((x: any) => {
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
            </div>
        </USER>
    );
};

const AdminSite = () => {
    const [AllAdmin, setAllAdmin] = useState<any[]>([]);
    const loadDetail = () => {
        axios({
            url: `http://localhost:3306/USER`,
            method: "get",
            params: {
                role: "admin",
            },
        }).then((result) => {
            setAllAdmin(result.data);
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(loadDetail, []);
    return (
        <ADMIN>
            <h2>Quản lí admin</h2>;
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Email</td>
                        <td>Name</td>
                        <td>Image</td>
                        {/* <td>xử lid</td> */}
                    </tr>
                </thead>
                <tbody>
                    {AllAdmin.map((x: any) => {
                        return (
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td>{x.email}</td>
                                <td>{x.username}</td>
                                <td>
                                    <img src={x.image} alt="" />
                                </td>
                                {/* <td>
                                    <Button>
                                        <i className="fas fa-trash-alt"></i>
                                    </Button>
                                    <Button>
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </td> */}
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot></tfoot>
            </table>
        </ADMIN>
    );
};

const UserSite = () => {
    const [AllUser, setAllUser] = useState<any[]>([]);
    const loadDetail = () => {
        axios({
            url: `http://localhost:3306/USER`,
            method: "get",
            params: {
                role: "user",
            },
        }).then((result) => {
            setAllUser(result.data);
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(loadDetail, []);
    return (
        <USER2>
            <h2>Quản lí nguời dùng</h2>;
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Email</td>
                        <td>Name</td>
                        <td>Image</td>
                        {/* <td>Xử lí</td> */}
                    </tr>
                </thead>
                <tbody>
                    {AllUser.map((x: any) => {
                        return (
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td>{x.email}</td>
                                <td>{x.username}</td>
                                <td>
                                    <img src={x.image} alt="" />
                                </td>
                                {/* <td>
                                    <Button>
                                        <i className="fas fa-trash-alt"></i>
                                    </Button>
                                    <Button>
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </td> */}
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot></tfoot>
            </table>
        </USER2>
    );
};

const SellerSite = () => {
    const [AllSeller, setAllSeller] = useState<any[]>([]);
    const loadDetail = () => {
        axios({
            url: `http://localhost:3306/USER`,
            method: "get",
            params: {
                role: "seller",
            },
        }).then((result) => {
            setAllSeller(result.data);
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(loadDetail, []);
    return (
        <SELLER>
            <h2>Quản lí nguời bán hàng</h2>;
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Email</td>
                        <td>Name</td>
                        <td>Image</td>
                        {/* <td>Xử lí</td> */}
                    </tr>
                </thead>
                <tbody>
                    {AllSeller.map((x: any) => {
                        return (
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td>{x.email}</td>
                                <td>{x.username}</td>
                                <td>
                                    <img src={x.image} alt="" width="25%" />
                                </td>
                                {/* <td>
                                    <Button>
                                        <i className="fas fa-trash-alt"></i>
                                    </Button>
                                    <Button>
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </td> */}
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot></tfoot>
            </table>
        </SELLER>
    );
};

const ItemSite = () => {
    const contextValue = useContext(AppContext);
    const User = contextValue[1].UserCurrent[0];
    const [AllItem, setAllItem] = useState<Item[]>([]);
    const load = () => {
        axios({
            url: `http://localhost:3306/item`,
            method: "get",
            params: {
                IdTSeller: User.id,
            },
        }).then((result) => {
            setAllItem(result.data);
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(load, []);

    const [Item, setItem] = useState<Item[]>([]);
    const load2 = () => {
        axios({
            url: `http://localhost:3306/item`,
            method: "get",
        }).then((result) => {
            setItem(result.data);
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(load2, []);
    return (
        <ITEM>
            <h2>Quản lí sản phẩm</h2>
            <Link to="/newitem" className="log">
                Thêm sản phẩm
            </Link>
            {User.role === "admin" || User.role === "superadmin" ? (
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
                            <td>Xử lí</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Item.map((x: Item) => {
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
                                    <td>
                                        {/* <Button>
                                            <i className="fas fa-trash-alt"></i>
                                        </Button> */}
                                        <Link to={`/edit/${x.id}`}>
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <></>
            )}
            {User.role === "seller" ? (
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
                            <td>Xử lí</td>
                        </tr>
                    </thead>
                    <tbody>
                        {AllItem.map((x: Item) => {
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
                                    <td>
                                        {/* <Button>
                                            <i className="fas fa-trash-alt"></i>
                                        </Button> */}
                                        <Link to={`/edit/${x.id}`}>
                                            <i className="fas fa-edit"></i>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <></>
            )}
        </ITEM>
    );
};

export default User;
