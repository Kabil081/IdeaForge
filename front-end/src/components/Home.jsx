import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Button } from './ui/Button';
import image from './images/homefinal.jpg';
import forumImage from './images/forum.png';
import retirementImage from './images/retirement.png';
import literacyImage from './images/literacy.png';
import healthcareImage from './images/healthcare.png';
import { Navigate, useNavigate } from 'react-router';
import HealthcareCostEstimator from './HealthcareCostEstimator';
const Home = () => {
  const navigate=useNavigate();
  return (
    <>
      <Navbar />
      <div className="relative">
        <div className="overflow-hidden relative">
          <img
            src={image}
            alt="homephoto"
            className="m-10 rounded-lg max-h-[500px] w-[90%] mx-auto object-cover"
          />
          <div className="absolute top-[25%] left-[12%] text-black text-5xl font-bold max-w-[600px] drop-shadow-lg">
            Secure Your Future with AI-Driven <br /> Financial Planning
          </div>
        </div>
        <div className="mt-10 mx-10 text-center text-lg text-gray-700">
          <p>
            Our platform provides personalized retirement planning and financial tools that empower retirees and pre-retirees to manage their finances more effectively. With AI-powered guidance, we help you build a future of financial security by optimizing your savings, managing healthcare costs, and improving your financial literacy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mx-10 mb-20">
          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <div className="w-full h-32 mb-4">
              <img src={forumImage} alt="Discussion Forum" className="rounded-lg object-contain w-full h-full" />
            </div>
            <h3 className="text-2xl font-semibold mb-2" >Discussion Forum</h3>
            <p className="text-gray-600 mb-4">Connect with others, ask questions, and share advice on retirement planning.</p>
            <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-700" onClick={()=>navigate('/discussion')}>Join Now</Button>
          </div>
          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <div className="w-full h-32 mb-4">
              <img src={retirementImage} alt="Retirement Plan" className="rounded-lg object-contain w-full h-full" />
            </div>
            <h3 className="text-2xl font-semibold mb-2" >Retirement Plan</h3>
            <p className="text-gray-600 mb-4">Start building a personalized plan to secure your financial future.</p>
            <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-700" onClick={()=>navigate('/profile')}>Start Planning</Button>
          </div>


          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <div className="w-full h-32 mb-4">
              <img src={literacyImage} alt="Financial Literacy" className="rounded-lg object-contain w-full h-full" />
            </div>
            <h3 className="text-2xl font-semibold mb-2" >Financial Literacy</h3>
            <p className="text-gray-600 mb-4">Enhance your financial knowledge and make informed decisions.</p>
            <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-700" onClick={()=>navigate('/literacy')} >Learn More</Button>
          </div>

          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <div className="w-full h-32 mb-4">
              <img src={healthcareImage} alt="Healthcare Costs" className="rounded-lg object-contain w-full h-full" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Healthcare</h3>
            <p className="text-gray-600 mb-4">Health is wealth.Plan for rising healthcare costs and safeguard your savings.</p>
            <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-700" onClick={()=>navigate('/health') }>Estimate Costs</Button>
          </div>
          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
            <div className="w-full h-32 mb-4">
              <img src={healthcareImage} alt="Healthcare Costs" className="rounded-lg object-contain w-full h-full" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Market Analysis</h3>
            <p className="text-gray-600 mb-4">Biggest Risk in life is not taking any risks.</p>
            <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-700" onClick={()=>navigate('/stock') }>Estimate Costs</Button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};
export default Home;
