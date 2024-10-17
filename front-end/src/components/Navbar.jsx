import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js'; 
import Logout from './Logout'; 
const Navbar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  const items = user
    ? [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Profile', path: '/profile' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Login', path: '/login' },
        { name: 'Sign Up', path: '/signup' },
      ];

  return (
    <nav>
      <ul className='flex flex-row bg-[#333333] mb-11 text-white items-center justify-center w-full gap-16 text-xl h-[100px]'>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
        {user && (
          <li>
            <Logout />
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
