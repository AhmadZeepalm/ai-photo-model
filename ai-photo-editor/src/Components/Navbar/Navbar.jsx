import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
export default function Navbar() {
  const { isAuthenticated, dispatch } = useAuthContext();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("logout successfully");
        dispatch({ type: "LOGOUT" });
        Navigate("/auth/login");
      })
      .catch((error) => {
        // An error happened.
        console.log("error in ", error);
      });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          PixelProAI
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ "--bs-scroll-height": "100px" }}
          >
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/demo">
                Demo
              </Link>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li> */}
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Link
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarScrollingDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Link</a>
            </li> */}
          </ul>
          <form className="d-flex">
            {!isAuthenticated ? (
              <Link to="/auth/login" className="btn btn-success">
                Login
              </Link>
            ) : (
              <button className="btn btn-dark" onClick={handleLogout}>
                Logout
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}
