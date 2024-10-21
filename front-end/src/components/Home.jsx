
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Discussion from './Discussion';
import ArticlesAndResources from './ArticlesandResoucrces';
const Home = () => {
  return (
    <>
      <Navbar />
      <Discussion />
      <ArticlesAndResources/>
      <Footer />
    </>
  );
};

export default Home;
