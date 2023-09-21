import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const Navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    Navigate("/signup");
  };
  return (
    <div>
      <img className="logo" src="https://i.pinimg.com/originals/7c/51/98/7c5198d2a0751fa76c8433dba4a1a12a.jpg" alt="logo" />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            {" "}
            <Link to="/add">Add Products</Link>
          </li>
          <li>
            {" "}
            <Link to="/update">Update Products</Link>
          </li>
          <li>
            {" "}
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logOut} to="/signup">
              LogOut ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            {" "}
            <Link to="/login">login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
