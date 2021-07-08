import React from "react";
import { Link } from "react-router-dom";

const navigation = ({ userObj }) => (
  <nav>
    <ul className="nav">
      <li className="nav-list">
        <Link to="/">
          <i className="fab fa-twitter"></i>
        </Link>
      </li>
      <li className="nav-list">
        <Link to="/profile">
          <i className="fas fa-user-edit"></i>
        </Link>
        <span>{userObj.displayName}'s Profile</span>
      </li>
    </ul>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
      integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
      crossorigin="anonymous"
    ></link>
  </nav>
);

export default navigation;
