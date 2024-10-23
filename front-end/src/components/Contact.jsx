import React, { useState } from 'react';
import Navbar from './Navbar';
import photo from './images/pic.jpg';
import Sendmail from "./Sendmail";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleAnswerIndex, setVisibleAnswerIndex] = useState(null);
  const [isSendmailOpen, setIsSendmailOpen] = useState(false);

  const display = () => {
    setIsVisible(!isVisible);
  };

  const toggleAnswer = (index) => {
    setVisibleAnswerIndex(visibleAnswerIndex === index ? null : index);
  };

  const openSendmail = () => {
    setIsSendmailOpen(true);
  };

  const closeSendmail = () => {
    setIsSendmailOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="m-0 flex items-center justify-evenly p-5">
        <div className="w-1/2 flex flex-col p-10 justify-center m-10">
          <h1 className="text-[3em] font-bold mb-5">Contact our support team</h1>
          <p>Need to get in touch with our team?</p>
          <div className="ml-10 mt-10">
            <button
              className="mr-10 bg-blue-700 px-[30px] py-[10px] rounded-lg text-white font-bold cursor-pointer active:scale-90"
              onClick={display}
            >
              FAQ
            </button>
            <button
              className="bg-blue-700 px-[30px] py-[10px] rounded-lg text-white font-bold cursor-pointer active:scale-90"
              onClick={openSendmail}
            >
              Get paid Guidance
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <img src={photo} className="w-full h-auto rounded-lg" alt="Contact" />
        </div>
      </div>

      {isVisible && (
        <div className="flex flex-col p-10 bg-slate-200">
          <div className="border-slate-950 border-2 rounded-lg p-10 mb-5 bg-white">
            <div className='flex w-full justify-between items-center'>
              <h1 className="text-xl font-bold">
                1. On what basis are the predictions given?
              </h1>
              <button
                className='bg-blue-700 px-[20px] py-[9px] text-white rounded-lg font-bold'
                onClick={() => toggleAnswer(1)}
              >
                View
              </button>
            </div>
            {visibleAnswerIndex === 1 && (
              <h2>
                The output predictions are given by a specially trained ML-module
                developed by experienced ML specialists.
              </h2>
            )}
          </div>

    
          <div className="border-black border-2 rounded-lg p-10 mb-5 bg-white">
            <div className='flex w-full justify-between items-center'>
              <h1 className="text-xl font-bold">2. How accurate are the predictions?</h1>
              <button
                className='bg-blue-700 px-[20px] py-[9px] text-white rounded-lg font-bold'
                onClick={() => toggleAnswer(2)}
              >
                View
              </button>
            </div>
            {visibleAnswerIndex === 2 && (
              <h2 className="text-lg">
                The predictions are based on historical data and advanced machine learning models.
                <br />
                While they provide valuable insights, they are not guaranteed to be 100% accurate due to market fluctuations and other factors.
              </h2>
            )}
          </div>

          <div className="border-black border-2 rounded-lg p-10 mb-5 bg-white">
            <div className='flex w-full justify-between items-center'>
              <h1 className="text-xl font-bold">
                3. Can I customize the inputs for predictions?
              </h1>
              <button
                className='bg-blue-700 px-[20px] py-[9px] text-white rounded-lg font-bold'
                onClick={() => toggleAnswer(3)}
              >
                View
              </button>
            </div>
            {visibleAnswerIndex === 3 && (
              <h2 className="text-lg">
                Yes, users can input their own financial details, including retirement goals, savings, and risk preferences.
                <br />
                The model adjusts predictions accordingly to provide tailored results.
              </h2>
            )}
          </div>

          <div className="border-black border-2 rounded-lg p-10 mb-5 bg-white">
            <div className='flex w-full justify-between items-center'>
              <h1 className="text-xl font-bold">
                4. How secure is my financial data?
              </h1>
              <button
                className='bg-blue-700 px-[20px] py-[9px] text-white rounded-lg font-bold'
                onClick={() => toggleAnswer(4)}
              >
                View
              </button>
            </div>
            {visibleAnswerIndex === 4 && (
              <h2 className="text-lg">
                We prioritize security. Your data is encrypted and stored securely, ensuring that only you have access to it.
                <br />
                Our app also complies with all industry-standard security protocols.
              </h2>
            )}
          </div>
          <div className="border-black border-2 rounded-lg p-10 mb-5 bg-white">
            <div className='flex w-full justify-between items-center'>
              <h1 className="text-xl font-bold">
                5. Can I rely solely on this app for retirement planning?
              </h1>
              <button
                className='bg-blue-700 px-[20px] py-[9px] text-white rounded-lg font-bold'
                onClick={() => toggleAnswer(5)}
              >
                View
              </button>
            </div>
            {visibleAnswerIndex === 5 && (
              <h2 className="text-lg">
                While the app provides valuable insights based on machine learning, we recommend consulting
                <br />
                with a financial advisor for comprehensive retirement planning. The app is designed to support, not replace, professional advice.
              </h2>
            )}
          </div>
        </div>
      )}

      <Sendmail isOpen={isSendmailOpen} closeSendmail={closeSendmail} />
    </div>
  );
};

export default Contact;
