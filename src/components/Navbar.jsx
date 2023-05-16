import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div>
        {/* Render the Home, About, and Contact components passed as props */}
        {props.home && <props.home />}
        {props.about && <props.about />}
        {props.contact && <props.contact />}
      </div>
    </div>
  );
}

export default Navbar;
