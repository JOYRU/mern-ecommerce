import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
        <Navlink to="/" className="nav_link">
           Home
        </Navlink>
    </nav>
  );
};

export default Navbar
