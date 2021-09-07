import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { FaSignOutAlt, FaShoppingCart, FaUserAlt, FaClipboardList, FaProductHunt } from 'react-icons/fa'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import SearchBar from "components/SearchBar";
import { logout } from "app/userSlice"
import "./Header.scss";

const Header = () => {
    const userInfo = useSelector(state => state.user.userInfo)

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Navbar collapseOnSelect expand="lg" id="header" className="navbar">
            <Navbar.Brand href="/home">
                <h2 className="header-brand">Tiktak</h2>
            </Navbar.Brand>

            <SearchBar />

            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navbar-dark bg-dark mx-auto" />

            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto mr-5 pr-5">
                    <Link to="/cart" className="nav-link">
                        <FaShoppingCart className="cart-icon" /> Cart
                    </Link>

                    {/* Admin Management menu */}
                    {userInfo && userInfo.is_staff && (
                        <NavDropdown title='Manages' id='manage'>
                            <NavDropdown.Item>
                                <Link to='/admin/users'>
                                    <FaUserAlt className='icon' /> Users
                                </Link>
                            </NavDropdown.Item>

                            <NavDropdown.Item>
                                <Link to='/admin/products'>
                                    <FaProductHunt className='icon' />Products
                                </Link>
                            </NavDropdown.Item>

                            <NavDropdown.Item>
                                <Link to='/admin/orders'>
                                    <FaClipboardList className='icon' /> Orders
                                </Link>
                            </NavDropdown.Item>

                        </NavDropdown>
                    )}

                    {/* User menu */}
                    {userInfo ? (
                        <NavDropdown title={userInfo.name} id='username'>
                            <NavDropdown.Item>
                                <Link to="/profile">
                                    <FaUserAlt className='icon' /> Profile
                                </Link>
                            </NavDropdown.Item>

                            <NavDropdown.Item href='/login' onClick={logoutHandler}><FaSignOutAlt className='icon' />Logout</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <Link to='/login' className="nav-link">
                            <FaUserAlt className='icon' /> Login
                        </Link>
                    )}

                </Nav>
            </Navbar.Collapse>
        </Navbar >
    );
}

export default Header;
