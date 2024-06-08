import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css";

export class Navbar extends PureComponent {
  render() {
    return (
      <div className="navbar">
        <nav class="navbar navbar-default">
          <div class="navbar-header">Welcome</div>
          <ul class="nav navbar-nav">
            <li>
              <Link to={"/"}>Books</Link>
            </li>
            <li>
              <Link to={"/users"}>users</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
