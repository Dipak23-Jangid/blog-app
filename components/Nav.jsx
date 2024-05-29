import { useState, useEffect } from "react";

import { NavLink } from ".";
import { userService } from "services";
//import logo from "../assets/images/logo-1.png";
import logo from "../assets/images/logo-1.png";
export { Nav };

function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  //if (!user) return null;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary px-3">
      <div className="navbar-brand bg-default ">
        {/* <img src="https://via.placeholder.com/30" alt="Logo" className="me-2" /> */}
        {/* <img
          src={logo}
          alt="Logo"
          className="me-2"
          style={{ height: "30px" }}
        /> */}
        <NavLink href="/" exact className="navbar-brand">
          <svg
            id="logo-54"
            width="170"
            height="41"
            viewBox="0 0 50 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.6841 40.138C31.7298 40.138 40.6841 31.1837 40.6841 20.138C40.6841 9.09234 31.7298 0.138031 20.6841 0.138031C9.63837 0.138031 0.684082 9.09234 0.684082 20.138C0.684082 31.1837 9.63837 40.138 20.6841 40.138ZM26.9234 9.45487C27.2271 8.37608 26.1802 7.73816 25.2241 8.41933L11.8772 17.9276C10.8403 18.6663 11.0034 20.138 12.1222 20.138L15.6368 20.138V20.1108H22.4866L16.9053 22.0801L14.4448 30.8212C14.1411 31.9 15.1879 32.5379 16.1441 31.8567L29.491 22.3485C30.5279 21.6098 30.3647 20.138 29.246 20.138L23.9162 20.138L26.9234 9.45487Z"
              className="ccustom"
              fill="#ffffff"
            ></path>{" "}
          </svg>
          <span style={{ marginLeft: "-18%" }}>Blogging Platform</span>
        </NavLink>
        {/*  <NavLink href="/" exact className="navbar-brand">
          Blogging Platform
        </NavLink> */}
      </div>
      <div className="navbar-nav me-auto">
        <NavLink href="/" exact className="nav-item nav-link">
          Home
        </NavLink>
        {user && (
          <NavLink href="/blogs" className="nav-item nav-link">
            Blog Post
          </NavLink>
        )}
      </div>
      {!user && (
        <div className="navbar-nav ms-auto d-flex align-items-center">
          <NavLink href="/account/login" className="nav-item nav-link">
            Login
          </NavLink>
        </div>
      )}
      {user && (
        <div className="navbar-nav ms-auto d-flex align-items-center">
          <span className="navbar-text me-3">
            Hi, {userService.userValue?.firstName}!
          </span>
          <button
            onClick={userService.logout}
            className="btn btn-link nav-item nav-link text-right"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
  /* return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-success px-3">
        <div className="navbar-nav me-auto">
          <NavLink href="/" exact className="nav-item nav-link">
            Home
          </NavLink>
          <NavLink href="/blogs" className="nav-item nav-link">
            Blog Post
          </NavLink>
        </div>
        {user && (
          <div className="navbar-nav ms-auto d-flex align-items-center">
            <span className="navbar-text me-3">
              Hi, {userService.userValue?.firstName}!
            </span>
            <button
              onClick={userService.logout}
              className="btn btn-link nav-item nav-link text-right"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </>
  ); */
}
