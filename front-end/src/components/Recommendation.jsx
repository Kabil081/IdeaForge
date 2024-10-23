import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Recommendation = () => {
  const location = useLocation();
  const { recommendation, futureSavings, savingsOverTime = [] } = location.state || {};
  const [marketData, setMarketData] = useState({
    sensex: null,
    nifty: null,
    gold: null,
    crypto: null,
    loading: true
  });

  // Fetch crypto prices
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=inr&include_24hr_change=true'
        );
        const data = await response.json();
        return {
          bitcoin: {
            price: data.bitcoin.inr,
            change: data.bitcoin.inr_24h_change
          },
          ethereum: {
            price: data.ethereum.inr,
            change: data.ethereum.inr_24h_change
          }
        };
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        return null;
      }
    };

    const fetchMarketData = async () => {
      // In a real application, you would fetch this data from appropriate APIs
      // Using sample data for demonstration
      const crypto = await fetchCryptoData();
      
      setMarketData({
        sensex: {
          value: 72500,
          change: 1.2
        },
        nifty: {
          value: 22000,
          change: 0.8
        },
        gold: {
          price: 63000, // 24K Gold price per 10g in INR
          change: 0.5,
          silverPrice: 75000, // per kg in INR
          silverChange: -0.3
        },
        crypto: crypto,
        loading: false
      });
    };

    const interval = setInterval(fetchMarketData, 60000); // Update every minute
    fetchMarketData(); // Initial fetch

    return () => clearInterval(interval);
  }, []);

  if (!location.state) {
    return (
      <div className="flex min-h-screen w-full justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500 p-6">
        <div className="flex flex-col gap-6 bg-white p-10 rounded-lg shadow-lg max-w-lg w-full">
          <h1 className="text-3xl font-extrabold text-center text-gray-800">Oops!</h1>
          <p className="text-lg text-gray-600 text-center">
            We couldn't retrieve your recommendation data. 
            Please go back to the profile page and try again.
          </p>
        </div>
      </div>
    );
  }

  const getSymbol = (recommendation) => {
    switch (recommendation) {
      case 'Gold':
        return '🏅';
      case 'Stocks':
        return '📈';
      case 'Mutual Funds':
        return '💼';
      case 'Crypto currency':
        return '💰';
      default:
        return '🔍';
    }
  };

  const formatNumber = (num) => {
    if (num >= 100000) {
      return `₹${(num/100000).toFixed(2)}L`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const PriceChange = ({ value }) => {
    const isPositive = value > 0;
    return (
      <span className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {Math.abs(value).toFixed(2)}%
      </span>
    );
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
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-400 to-purple-500 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Your Financial Recommendation</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              {recommendation && (
                <h2 className="text-xl font-semibold text-green-600 text-center mb-4">
                  {getSymbol(recommendation)} Recommended Investment: <span className="text-gray-800">{recommendation}</span>
                </h2>
              )}
              
              {futureSavings !== undefined && (
                <h3 className="text-lg text-gray-700 text-center mb-4">
                  💰 Future Savings at Retirement: <span className="font-bold">₹ {futureSavings}</span>
                </h3>
              )}
              
              {savingsOverTime.length > 0 && (
                <div className="h-[300px]">
                  <Line 
                    data={chartData} 
                    options={{ 
                      responsive: true, 
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: true,
                          position: 'top',
                        },
                      },
                    }}
                  />
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Live Market Overview</h3>
              {marketData.loading ? (
                <div className="text-center py-4">Loading market data...</div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Sensex</span>
                      <div className="flex items-center gap-3">
                        <span>{formatNumber(marketData.sensex.value)}</span>
                        <PriceChange value={marketData.sensex.change} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Nifty 50</span>
                      <div className="flex items-center gap-3">
                        <span>{formatNumber(marketData.nifty.value)}</span>
                        <PriceChange value={marketData.nifty.change} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Precious Metals (Live)</h4>
                    <div className="flex justify-between items-center">
                      <span>Gold (24K/10g)</span>
                      <div className="flex items-center gap-3">
                        <span>{formatNumber(marketData.gold.price)}</span>
                        <PriceChange value={marketData.gold.change} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Silver (1kg)</span>
                      <div className="flex items-center gap-3">
                        <span>{formatNumber(marketData.gold.silverPrice)}</span>
                        <PriceChange value={marketData.gold.silverChange} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Cryptocurrency (Live)</h4>
                    <div className="flex justify-between items-center">
                      <span>Bitcoin (BTC)</span>
                      <div className="flex items-center gap-3">
                        <span>{formatNumber(marketData.crypto?.bitcoin.price)}</span>
                        <PriceChange value={marketData.crypto?.bitcoin.change} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Ethereum (ETH)</span>
                      <div className="flex items-center gap-3">
                        <span>{formatNumber(marketData.crypto?.ethereum.price)}</span>
                        <PriceChange value={marketData.crypto?.ethereum.change} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold flex items-center mb-4">
              <span className="mr-2">🏅</span> Gold Investment
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">How to Invest in Gold</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Gold ETFs through stock exchanges</li>
                  <li>Sovereign Gold Bonds (Government backed)</li>
                  <li>Digital Gold through PhonePe/GooglePay</li>
                  <li>Physical Gold from hallmarked jewelers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Current Investment Options</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>SGB Series II 2023-24 @ ₹6,000/g</li>
                  <li>Goldbees ETF @ ₹47.85/unit</li>
                  <li>HDFC Gold Fund @ ₹15.60/unit</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold flex items-center mb-4">
              <span className="mr-2">📈</span> Stock Market
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Top Performing Stocks</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>HDFC Bank (NSE: HDFCBANK)</li>
                  <li>Reliance Industries (NSE: RELIANCE)</li>
                  <li>Infosys (NSE: INFY)</li>
                  <li>TCS (NSE: TCS)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">How to Start</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Open Demat account with Zerodha/Groww</li>
                  <li>Complete KYC verification</li>
                  <li>Link bank account</li>
                  <li>Start with blue-chip stocks</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold flex items-center mb-4">
              <span className="mr-2">💼</span> Mutual Funds
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Top Performing Funds</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Axis Bluechip Fund (Direct-Growth)</li>
                  <li>Mirae Asset Large Cap Fund</li>
                  <li>SBI Small Cap Fund</li>
                  <li>ICICI Prudential Technology Fund</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Investment Options</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>SIP starting from ₹500/month</li>
                  <li>Direct plans through AMC websites</li>
                  <li>Through apps like Groww, Kuvera</li>
                  <li>Index funds for passive investing</li>
                  <a href='https://groww.in/' className='font-thin text-[blue]'>Go to google</a>

                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold flex items-center mb-4">
              <span className="mr-2">💰</span> Cryptocurrency
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Top Indian Exchanges</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>WazirX - Most liquid INR market</li>
                  <li>CoinDCX - Advanced trading features</li>
                  <li>Zebpay - Easy for beginners</li>
                  <li>Binance - Global liquidity</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Investment Process</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Complete KYC on regulated exchanges</li>
                  <li>Start with top coins (BTC/ETH)</li>
                  <li>Use UPI/bank transfer for deposits</li>
                  <li>Secure with 2FA authentication</li>
                  <a href='https://binomo-investment.com/' className='font-thin text-[blue]'>Go to google</a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;