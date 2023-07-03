import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import NavProfile from "./navProfile"

const NavBar = () => {
    const { currentUser } = useAuth()
    return (
        <nav className="navbar navbar-expand-lg navbar-light mb-3" style={{ backgroundColor: "#e3f2fd" }}>
            <div className="container-fluid">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Main
                            </Link>
                        </li>
                        {currentUser && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">
                                    Users
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        {currentUser ? (
                            <NavProfile />
                        ) : (
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
