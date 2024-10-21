import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useLocation } from 'react-router-dom';

const Recommendation = () => {
  const location = useLocation();
  const { recommendation, futureSavings, savingsOverTime = [] } = location.state || {};  // Default to empty array

  // Check if location.state is null or undefined
  if (!location.state) {
    return (
      <div className="flex min-h-screen w-full justify-center items-center bg-gradient-to-r from-blue-500 to-green-500">
        <div className="flex flex-col gap-6 bg-white p-10 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>There was an error retrieving the recommendation data. Please go back to the profile page and try again.</p>
        </div>
      </div>
    );
  }

  console.log('Recommendation Data:', { recommendation, futureSavings, savingsOverTime });

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
    <div className="flex min-h-screen w-full justify-center items-center bg-gradient-to-r from-blue-500 to-green-500">
      <div className="flex flex-col gap-6 bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Recommendation</h1>
        
        {recommendation ? (
          <h2>Recommended Investment: {recommendation}</h2>
        ) : (
          <h2>No recommendation available.</h2>
        )}
        
        {futureSavings !== undefined ? (
          <h3>Future Savings at Retirement: ₹ {futureSavings}</h3>
        ) : (
          <h3>No future savings data available.</h3>
        )}
        
        {/* Display savings graph */}
        {savingsOverTime.length > 0 ? (
          <div>
            <Line data={chartData} />
          </div>
        ) : (
          <p>No savings data available.</p>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
