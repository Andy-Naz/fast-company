import React from "react"
import { Link } from "react-router-dom"
import NavProfile from "./navProfile"
import { useSelector } from "react-redux"
import { getIsLoggedIn } from "../../store/users"

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn())

    return (
        <nav className="navbar navbar-expand-sm navbar-light mb-3" style={{ backgroundColor: "#e3f2fd" }}>
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Main
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar
