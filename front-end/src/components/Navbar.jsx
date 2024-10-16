import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const items = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' }
  ];
  return(
    <nav>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default Navbar;
