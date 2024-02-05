import React from "react";

import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/SignUp");
  };

  return (
    <div>
      {auth ? (
        <ul className="nav-ul">
          <li>
            {" "}
            <Link to="/">Products</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/update">Update Products</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/add">Add Products</Link>{" "}
          </li>

          <li>
            <Link onClick={logout} to="/SignUp">
              Logout Hi
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <li>
            <Link to="/SignUp">signUp</Link>
          </li>
          <li>
            <Link to="/Login">login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;

//({JSON.parse(auth).name})
