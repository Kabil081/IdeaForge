import React from 'react';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faFacebook, faWhatsapp, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import {faPhone,faEnvelope,faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons"
import { Navigate, useNavigate } from 'react-router-dom';
const Footer = () => {
  const listVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  const navigate=useNavigate();
  return (
    <motion.div
      className='flex flex-col md:flex-row bg-blue-600 py-11 px-32 cursor-pointer'
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={footerVariants}
      transition={{ duration: 1 }}
    >
      <div className='flex flex-col px-11 py-11 cursor-pointer'>
      <ul className='text-white'>
  {['Information', 'Main', 'Gallery', 'Projects', 'Certifications', 'Contact'].map((item, index) => (
    <motion.li
      className='py-3 text-white cursor-pointer font-semibold'
      key={index}
      variants={listVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.2 }} 
      whileHover={{ scale: 1.1, color: 'gray', transition: { duration: 0.3 } }} 
      onClick={() => navigate(`/${item.toLowerCase()}`)}
    >
      {item}
    </motion.li>
  ))}
</ul>
    </div>
      <div className='flex flex-col mx-16 my-10'>
        <div className='my-3'>
          <h1 className='text-white font-semibold'>
            Contacts  
          </h1> 
        </div>
        <div className='flex flex-col py-4 space-y-5'>
          <a className='pb-4 flex flex-row max-w-[300px]'>
          <FontAwesomeIcon icon={faPhone} className="text-white text-2xl mr-3 hover:text-gray-400 transition duration-300" target='_blank'/>
          <h3 className='text-white font-semibold'>1234  Sample Street Austin Texas 76354875</h3>
          </a>
          <a className='pb-4 flex flex-row max-w-[300px]'>
            <FontAwesomeIcon icon={faEnvelope} className="text-white text-2xl mr-3 hover:text-gray-400 transition duration-300"  target='_blank'/>
            <h3 className='text-white font-semibold'>12345@gmail.com</h3>
          </a>
          <a className='pb-4 flex flex-row max-w-[300px]'>
            <FontAwesomeIcon icon={faMapMarkedAlt} className="text-white text-2xl mr-3 hover:text-gray-400 transition duration-300" target='_blank'/>
            <h3 className='text-white font-semibold'>328947.827489.28974</h3>
          </a>
        </div>
      </div>
      <div className='flex flex-col ml-11 my-12 p-10'>
        <h2 className='text-white text-lg font-bold mb-4'>Social Media</h2>
        <div className='flex space-x-4'>
          <a href="https://www.facebook.com" target='_blank' rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="text-white text-2xl hover:text-gray-400 transition duration-300" />
          </a>
          <a href='https://www.whatsapp.com' target='_blank' rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} className="text-white text-2xl hover:text-gray-400 transition duration-300" />
          </a>
          <a href='https://www.twitter.com' target='_blank' rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className="text-white text-2xl hover:text-gray-400 transition duration-300" />
          </a>
          <a href='https://www.instagram.com' target='_blank' rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="text-white text-2xl hover:text-gray-400 transition duration-300" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
export default Footer;