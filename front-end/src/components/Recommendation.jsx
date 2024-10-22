import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; 
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
  const getSymbol = (recommendation) => {
    switch (recommendation) {
      case 'Gold':
        return '🏅';
      case 'Stocks':
        return '📈';
        return '📈'; 
      case 'Mutual Funds':
        return '💼';
        return '💼'; 
      case 'Crypto currency':
        return '💰';
        return '💰'; 
      case 'Real Estate':
        return '🏡';
        return '🏡'; 
      default:
        return '🔍';
        return '🔍'; 
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
        tension: 0.4,
      }
    ]
  };

  return (
    <div className="flex min-h-screen w-full justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500 p-6">
      <div className="flex flex-col gap-6 bg-white p-10 rounded-lg shadow-lg max-w-4xl w-full">
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
        
        {savingsOverTime.length > 0 ? (
                {savingsOverTime.length > 0 ? (
          <div className="mt-4">
            <Line 
              data={chartData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                    labels: {
                      color: '#333',
                      boxHeight: 10,
                      padding: 20,
                    },
                  },
                },
              }} 
              height={400} 
            />
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">📉 No savings data available.</p>
        )}

        {/* Investment Flashcards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Stocks Flashcard */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg text-white">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="mr-2">📈</span> Stocks
            </h3>
            <p className="mt-2">Equities or shares in a company, offering potential for high returns.</p>
            <div className="mt-4">
              <h4 className="font-semibold">Pros:</h4>
              <ul className="list-disc list-inside">
                <li>High potential returns</li>
                <li>Dividends provide income</li>
                <li>Liquid assets</li>
              </ul>
            </div>
            <div className="mt-2">
              <h4 className="font-semibold">Cons:</h4>
              <ul className="list-disc list-inside">
                <li>Market volatility</li>
                <li>Requires research</li>
                <li>Risk of loss</li>
              </ul>
            </div>
          </div>

          {/* Gold Flashcard */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg text-white">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="mr-2">🏅</span> Gold
            </h3>
            <p className="mt-2">A precious metal traditionally used as a hedge against inflation.</p>
            <div className="mt-4">
              <h4 className="font-semibold">Pros:</h4>
              <ul className="list-disc list-inside">
                <li>Safe haven asset</li>
                <li>Inflation hedge</li>
                <li>Tangible asset</li>
              </ul>
            </div>
            <div className="mt-2">
              <h4 className="font-semibold">Cons:</h4>
              <ul className="list-disc list-inside">
                <li>No income generation</li>
                <li>Storage costs</li>
                <li>Market fluctuations</li>
              </ul>
            </div>
          </div>

          {/* Real Estate Flashcard */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg text-white">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="mr-2">🏡</span> Real Estate
            </h3>
            <p className="mt-2">Investment in property, providing rental income and capital appreciation.</p>
            <div className="mt-4">
              <h4 className="font-semibold">Pros:</h4>
              <ul className="list-disc list-inside">
                <li>Stable cash flow</li>
                <li>Tax advantages</li>
                <li>Long-term appreciation</li>
              </ul>
            </div>
            <div className="mt-2">
              <h4 className="font-semibold">Cons:</h4>
              <ul className="list-disc list-inside">
                <li>High upfront costs</li>
                <li>Maintenance required</li>
                <li>Illiquid asset</li>
              </ul>
            </div>
          </div>

          {/* Cryptocurrency Flashcard */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg text-white">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="mr-2">💰</span> Cryptocurrency
            </h3>
            <p className="mt-2">Digital currencies with high potential but significant volatility.</p>
            <div className="mt-4">
              <h4 className="font-semibold">Pros:</h4>
              <ul className="list-disc list-inside">
                <li>High potential returns</li>
                <li>Decentralized assets</li>
                <li>Growing acceptance</li>
              </ul>
            </div>
            <div className="mt-2">
              <h4 className="font-semibold">Cons:</h4>
              <ul className="list-disc list-inside">
                <li>Market volatility</li>
                <li>Regulatory risks</li>
                <li>Technical knowledge required</li>
              </ul>
            </div>
          </div>

          {/* Mutual Funds Flashcard */}
          <div className="bg-gradient-to-r from-red-400 to-red-600 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg text-white md:col-span-2">
            <h3 className="text-2xl font-bold flex items-center">
              <span className="mr-2">💼</span> Mutual Funds
            </h3>
            <p className="mt-2">Pooled investment vehicles managed by professionals, offering diversification.</p>
            <div className="mt-4">
              <h4 className="font-semibold">Pros:</h4>
              <ul className="list-disc list-inside">
                <li>Diversification across various assets</li>
                <li>Professional management</li>
                <li>Liquidity</li>
              </ul>
            </div>
            <div className="mt-2">
              <h4 className="font-semibold">Cons:</h4>
              <ul className="list-disc list-inside">
                <li>Management fees</li>
                <li>Less control over investments</li>
                <li>Potential for lower returns than stocks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
