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
      <ul className='flex flex-row bg-[#333333] mb-11 text-white items-center justify-center w-full gap-16 text-xl h-[100px]'>
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
