import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/AuthProviders";
import useCart from "../shared/useCart";
import useAdmin from "../shared/useAdmin";

export default function Navbar() {

    const { user, logout } = useContext(UserContext);
    const [isAdmin] = useAdmin();

    // const { emailUser, setEmailUser } = useState([]);
    // useEffect(() => {
    //     fetch('http://localhost:5000/user')
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    // }, [])

    const [cart] = useCart();
    const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);
    const [state, setState] = useState({
        left: false
    });

    const handlelogout = () => {
        logout()
            .then(() => { })
            .catch((error) => { console.error(error) })
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Link to='/'><ListItem disablePadding>
                    <ListItemButton>
                        Home
                    </ListItemButton>
                </ListItem></Link>
                <Link to='/foodmenu'><ListItem disablePadding>
                    <ListItemButton>
                        Foods Menu
                    </ListItemButton>
                </ListItem></Link>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Link to='/'>Shop</Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Link to='/'>Contact Us</Link>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box >
    );


    return (
        <div>
            <div className="navbar fixed z-40 bg-black bg-opacity-75 text-warning">
                <div className="navbar-start">
                    <div className="bg-yellow-300 rounded-md md:hidden">
                        {['menu'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                                <SwipeableDrawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                    onOpen={toggleDrawer(anchor, true)}
                                >
                                    {list(anchor)}
                                </SwipeableDrawer>
                            </React.Fragment>
                        ))}
                    </div>
                    <Link to="/" className="btn btn-ghost md:text-4xl text-xl"><img className="md:w-10 md:h-10 w-5 h-5" src="https://i.ibb.co/hd3Tt9X/logo.png" alt="" />Bistro Boss Restaurant</Link>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal md:font-thin md:text-xl px-1">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/foodmenu">Foods Menu</Link></li>
                        <li><a>Shop</a></li>
                        <li><a>Contact Us</a></li>
                    </ul>
                </div>
                <div className="navbar-center">
                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            {
                                user && !isAdmin ? <div tabIndex={0} role="button" className="btn btn-ghost ml-32 md:ml-0 md:mr-8 btn-circle">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        <span className="badge badge-sm indicator-item">+{cart?.length || 0}</span>
                                    </div>
                                </div> : <span className="md:hidden"></span>
                            }
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 shadow bg-primary text-black">
                                <div className="card-body">
                                    <span className="font-bold text-lg">+{cart?.length || 0} Items</span>
                                    <span className="text-black">Subtotal: ${totalPrice}</span>
                                    <div className="card-actions">
                                        <Link to="/dashboard/mycart"><button className="btn text-center btn-black btn-block">View cart</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar md:mr-5">
                                {
                                    user ? <div className="w-6 rounded-full">
                                        <img alt="Profile Photo" src={user.photoURL}/>
                                    </div> : <Link to="/login"><button className="btn ml-64 md:ml-0 btn-primary navbar-center">Login</button></Link>
                                }
                            </div>
                            {
                                user ? <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-primary text-black">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                    <li><a onClick={handlelogout}>Logout</a></li>
                                </ul> : <span className="hidden"></span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
