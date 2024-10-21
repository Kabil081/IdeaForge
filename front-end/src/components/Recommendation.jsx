import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically register all components
import { useLocation } from 'react-router-dom';

const Recommendation = () => {
  const location = useLocation();
  const { recommendation, futureSavings, savingsOverTime = [] } = location.state || {};

  if (!location.state) {
    return (
      <div className="flex min-h-screen w-full justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500 p-6">
        <div className="flex flex-col gap-6 bg-white p-10 rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-3xl font-extrabold text-center text-gray-800">Oops!</h1>
          <p className="text-lg text-gray-600 text-center">
            We couldn’t retrieve your recommendation data. 
            Please go back to the profile page and try again.
          </p>
        </div>
      </div>
    );
  }

  console.log('Recommendation Data:', { recommendation, futureSavings, savingsOverTime });

  // Define symbols based on the recommendation type
  const getSymbol = (recommendation) => {
    switch (recommendation) {
      case 'Gold':
        return '🏅'; // Gold symbol
      case 'Stocks':
        return '📈'; // Stock symbol
      case 'Mutual Funds':
        return '💼'; // Mutual Funds symbol
      case 'Crypto currency':
        return '💰'; // Crypto symbol
      case 'Real Estate':
        return '🏡'; // Real Estate symbol
      default:
        return '🔍'; // Default symbol
    }
  };

  const chartData = {
    labels: savingsOverTime.length > 0 ? savingsOverTime.map((_, index) => index) : [],
    datasets: [
      {
        label: 'Future Savings Over Time',
        data: savingsOverTime,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }
    ]
  };

  return (
    <div className="flex min-h-screen w-full justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500 p-6">
      <div className="flex flex-col gap-6 bg-white p-10 rounded-lg shadow-lg max-w-xl w-full">
        <h1 className="text-4xl font-extrabold text-center text-gray-800">Your Financial Recommendation</h1>
        
        <p className="text-lg text-gray-700 mb-4 text-center">
          Embark on a journey towards a brighter financial future with our personalized insights!
        </p>

        {recommendation ? (
          <h2 className="text-xl font-semibold text-green-600 text-center">
            {getSymbol(recommendation)} Recommended Investment: <span className="text-gray-800">{recommendation}</span>
          </h2>
        ) : (
          <h2 className="text-xl font-semibold text-red-500 text-center">
            🔍 No recommendation available.
          </h2>
        )}
        
        {futureSavings !== undefined ? (
          <h3 className="text-lg text-gray-700 text-center">
            💰 Future Savings at Retirement: <span className="font-bold">₹ {futureSavings}</span>
          </h3>
        ) : (
          <h3 className="text-lg text-gray-700 text-center">
            🕰️ No future savings data available.
          </h3>
        )}
        
        {/* Display savings graph */}
        {savingsOverTime.length > 0 ? (
          <div className="mt-4">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">📉 No savings data available.</p>
        )}

        <p className="text-sm text-gray-500 mt-6 text-center">
          Remember, every small step today can lead to a significant change tomorrow. 
          Start investing in your future now!
        </p>
        
        <p className="text-sm text-red-600 text-center mt-4">
          ⚠️ This is not 100% guaranteed. Please invest at your own risk.
        </p>
      </div>
    </div>
  );
};

export default Recommendation;
