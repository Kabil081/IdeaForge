import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, IndianRupee, TrendingUp, Calendar, Wallet } from 'lucide-react';
const formatCurrency = (value) => {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  } else if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)}L`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
};
const calculateReturns = (principal, monthlyInvestment, yearlyInvestment, years, rate) => {
  let total = principal;
  const dataPoints = [];
  
  for (let year = 0; year <= years; year++) {
    dataPoints.push({
      year,
      amount: total,
    });
    for (let month = 0; month < 12; month++) {
      total += monthlyInvestment;
      total *= (1 + rate / 12);
    }
    
    total += yearlyInvestment;
  }
  
  return dataPoints;
};
export default function Recommendation() {
  const [formData, setFormData] = useState({
    age: 30,
    retirementAge: 60,
    currentSavings: 1000000,
    monthlyInvestment: 10000,
    yearlyInvestment: 100000,
    riskTolerance: 3
  });
  const [recommendation, setRecommendation] = useState(null);
  const [marketData, setMarketData] = useState({
    sensex: { value: 72500, change: 1.2 },
    nifty: { value: 22000, change: 0.8 },
    gold: { price: 63000, change: 0.5 },
    crypto: { 
      bitcoin: { price: 5500000, change: 2.3 },
      ethereum: { price: 280000, change: 1.8 }
    }
  });

  useEffect(() => {
    const years = formData.retirementAge - formData.age;
    const riskBasedReturns = {
      1: { type: 'Gold', rate: 0.08 },
      2: { type: 'Mutual Funds', rate: 0.12 },
      3: { type: 'Stocks', rate: 0.15 },
      4: { type: 'Crypto', rate: 0.20 }
    };
    const recommendedInvestment = riskBasedReturns[formData.riskTolerance];
    const projectedReturns = calculateReturns(
      formData.currentSavings,
      formData.monthlyInvestment,
      formData.yearlyInvestment,
      years,
      recommendedInvestment.rate
    );
    setRecommendation({
      type: recommendedInvestment.type,
      returns: projectedReturns,
      totalAmount: projectedReturns[projectedReturns.length - 1].amount
    });
  }, [formData]);

  const PriceChange = ({ value }) => (
    <span className={`flex items-center ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      {value >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
      {Math.abs(value).toFixed(2)}%
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Investment Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Current Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Retirement Age</label>
              <input
                type="number"
                value={formData.retirementAge}
                onChange={(e) => setFormData({...formData, retirementAge: parseInt(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Current Savings</label>
              <input
                type="number"
                value={formData.currentSavings}
                onChange={(e) => setFormData({...formData, currentSavings: parseInt(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Monthly Investment</label>
              <input
                type="number"
                value={formData.monthlyInvestment}
                onChange={(e) => setFormData({...formData, monthlyInvestment: parseInt(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Yearly Investment</label>
              <input
                type="number"
                value={formData.yearlyInvestment}
                onChange={(e) => setFormData({...formData, yearlyInvestment: parseInt(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Risk Tolerance (1-4)</label>
              <input
                type="number"
                min="1"
                max="4"
                value={formData.riskTolerance}
                onChange={(e) => setFormData({...formData, riskTolerance: parseInt(e.target.value)})}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Recommendation Section */}
        {recommendation && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Your Investment Recommendation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold">Recommended Investment</h3>
                  <p className="text-3xl font-bold text-blue-600">{recommendation.type}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-semibold">Projected Total at Retirement</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(recommendation.totalAmount)}
                  </p>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={recommendation.returns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'bottom' }} />
                    <YAxis 
                      tickFormatter={(value) => formatCurrency(value)}
                      width={100}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), "Amount"]}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#2563eb" 
                      name="Projected Growth"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Stock Market</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Sensex</span>
                  <div className="flex items-center gap-2">
                    <span>{formatCurrency(marketData.sensex.value)}</span>
                    <PriceChange value={marketData.sensex.change} />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Nifty</span>
                  <div className="flex items-center gap-2">
                    <span>{formatCurrency(marketData.nifty.value)}</span>
                    <PriceChange value={marketData.nifty.change} />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Gold</h3>
              <div className="flex justify-between items-center">
                <span>Per 10g</span>
                <div className="flex items-center gap-2">
                  <span>{formatCurrency(marketData.gold.price)}</span>
                  <PriceChange value={marketData.gold.change} />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">Cryptocurrency</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Bitcoin</span>
                  <div className="flex items-center gap-2">
                    <span>{formatCurrency(marketData.crypto.bitcoin.price)}</span>
                    <PriceChange value={marketData.crypto.bitcoin.change} />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ethereum</span>
                  <div className="flex items-center gap-2">
                    <span>{formatCurrency(marketData.crypto.ethereum.price)}</span>
                    <PriceChange value={marketData.crypto.ethereum.change} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
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
                  <a href='https://www.binance.com/' className='font-thin text-[blue]'>Go to google</a>
                  <a href='https://www.binance.com/' className='font-thin text-[blue]'>Go to google</a>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </div>
    
  );
}