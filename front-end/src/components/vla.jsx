import React, { useState } from 'react';

const FinancialHealthAssessment = () => {
  // ... [Previous state management code remains the same]
  const [savingsRate, setSavingsRate] = useState('');
  const [debtLevel, setDebtLevel] = useState('');
  const [retirementReadiness, setRetirementReadiness] = useState('');
  const [allocations, setAllocations] = useState({
    stocks: '',
    bonds: '',
    realEstate: '',
    crypto: ''
  });
  const [result, setResult] = useState(null);
  const [investmentPlans, setInvestmentPlans] = useState([]);
  const [diversificationResult, setDiversificationResult] = useState('');
  const [allocationFeedback, setAllocationFeedback] = useState({});
  const [activeTab, setActiveTab] = useState('assessment');

  const assessFinancialHealth = () => {
    let score = 0;

    if (savingsRate >= 20) score += 2;
    else if (savingsRate >= 10) score += 1;

    if (debtLevel < 30) score += 2;
    else if (debtLevel < 50) score += 1;

    if (retirementReadiness === 'Yes') score += 2;

    const totalAllocation = Object.values(allocations).reduce((acc, val) => acc + parseFloat(val || 0), 0);

    const newAllocationFeedback = {};
    let wellDiversified = true;

    Object.entries(allocations).forEach(([key, value]) => {
      if (value < 10 || value > 50) {
        newAllocationFeedback[key] = 'Over/Under Allocated';
        wellDiversified = false;
      } else {
        newAllocationFeedback[key] = 'Well Balanced';
      }
    });

    setAllocationFeedback(newAllocationFeedback);

    if (totalAllocation !== 100) {
      setDiversificationResult('Portfolio allocation must total 100%');
      return;
    }

    if (wellDiversified) {
      score += 2;
      setDiversificationResult('Portfolio is well-diversified');
    } else {
      setDiversificationResult('Consider rebalancing your portfolio');
    }

    if (score >= 7) {
      setResult('Excellent');
      setInvestmentPlans([
        {
          title: 'Growth-Focused Portfolio',
          riskLevel: 'High',
          expectedReturn: '12-15% annually',
          timeHorizon: '10+ years',
          allocation: {
            stocks: 60,
            realEstate: 20,
            crypto: 10,
            bonds: 10
          },
          strategies: [
            'High-growth tech stocks',
            'Emerging market ETFs',
            'Real estate investment trusts',
            'Strategic cryptocurrency positions'
          ],
          description: 'Designed for investors seeking aggressive growth with high risk tolerance.'
        },
        {
          title: 'Innovation Portfolio',
          riskLevel: 'Very High',
          expectedReturn: '15-20% annually',
          timeHorizon: '15+ years',
          allocation: {
            stocks: 50,
            crypto: 20,
            venture: 20,
            bonds: 10
          },
          strategies: [
            'Venture capital funds',
            'Web3 investments',
            'Startup equity',
            'Innovation-focused ETFs'
          ],
          description: 'Perfect for those wanting to invest in future technologies and disruption.'
        }
      ]);
    } else if (score >= 4) {
      setResult('Good');
      setInvestmentPlans([
        {
          title: 'Balanced Growth Portfolio',
          riskLevel: 'Medium',
          expectedReturn: '8-10% annually',
          timeHorizon: '5-10 years',
          allocation: {
            stocks: 40,
            bonds: 30,
            realEstate: 20,
            cash: 10
          },
          strategies: [
            'Blue-chip dividend stocks',
            'Corporate bonds',
            'REITs',
            'Index funds'
          ],
          description: 'Balanced approach combining growth with income generation.'
        },
        {
          title: 'Income Focus Portfolio',
          riskLevel: 'Medium-Low',
          expectedReturn: '6-8% annually',
          timeHorizon: '3-7 years',
          allocation: {
            bonds: 40,
            stocks: 30,
            realEstate: 20,
            cash: 10
          },
          strategies: [
            'High-yield bonds',
            'Dividend aristocrats',
            'Municipal bonds',
            'Preferred stocks'
          ],
          description: 'Emphasizes regular income with moderate growth potential.'
        }
      ]);
    } else {
      setResult('Needs Improvement');
      setInvestmentPlans([
        {
          title: 'Conservative Portfolio',
          riskLevel: 'Low',
          expectedReturn: '4-6% annually',
          timeHorizon: '2-5 years',
          allocation: {
            bonds: 50,
            stocks: 20,
            cash: 20,
            realEstate: 10
          },
          strategies: [
            'Government bonds',
            'High-yield savings',
            'CD ladder strategy',
            'Low-volatility ETFs'
          ],
          description: 'Focus on capital preservation with steady, modest returns.'
        },
        {
          title: 'Wealth Building Portfolio',
          riskLevel: 'Low-Medium',
          expectedReturn: '5-7% annually',
          timeHorizon: '3-6 years',
          allocation: {
            bonds: 40,
            stocks: 30,
            cash: 20,
            realEstate: 10
          },
          strategies: [
            'Target-date funds',
            'Bond ETFs',
            'Value stocks',
            'Money market funds'
          ],
          description: 'Designed to build wealth gradually with controlled risk.'
        }
      ]);
    }
    
    setActiveTab('results');
  };

  const handleAllocationChange = (assetClass, value) => {
    setAllocations(prev => ({ ...prev, [assetClass]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">Financial Health Dashboard</h1>
          <p className="text-blue-600">Analyze your financial health and get personalized investment recommendations</p>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('assessment')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'assessment'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
            }`}
          >
            Assessment
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'results'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
            }`}
          >
            Results
          </button>
        </div>

        {activeTab === 'assessment' && (
          <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-100">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-900">Financial Assessment</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-900">Savings Rate (% of income)</label>
                  <input
                    type="number"
                    value={savingsRate}
                    onChange={(e) => setSavingsRate(e.target.value)}
                    className="w-full p-2 bg-white border border-blue-200 rounded-lg text-blue-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter percentage"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-blue-900">Debt Level (% of income)</label>
                  <input
                    type="number"
                    value={debtLevel}
                    onChange={(e) => setDebtLevel(e.target.value)}
                    className="w-full p-2 bg-white border border-blue-200 rounded-lg text-blue-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter percentage"
                  />
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <label className="block text-sm font-medium text-blue-900">Retirement Readiness</label>
                <select
                  value={retirementReadiness}
                  onChange={(e) => setRetirementReadiness(e.target.value)}
                  className="w-full p-2 bg-white border border-blue-200 rounded-lg text-blue-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select...</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold text-blue-900">Portfolio Allocation</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(allocations).map(([asset, value]) => (
                    <div key={asset} className="space-y-2">
                      <label className="block text-sm font-medium text-blue-900">
                        {asset.charAt(0).toUpperCase() + asset.slice(1)} (%)
                      </label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleAllocationChange(asset, e.target.value)}
                        className="w-full p-2 bg-white border border-blue-200 rounded-lg text-blue-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter percentage"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={assessFinancialHealth}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6"
              >
                Analyze Financial Health
              </button>
            </div>
          </div>
        )}

        {activeTab === 'results' && result && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-blue-900">Financial Health Score: {result}</h2>
                {diversificationResult && (
                  <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg text-blue-700">
                    {diversificationResult}
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {investmentPlans.map((plan, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-blue-100">
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">{plan.title}</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-600">Risk Level:</span>
                        <p className="font-medium text-blue-900">{plan.riskLevel}</p>
                      </div>
                      <div>
                        <span className="text-blue-600">Expected Return:</span>
                        <p className="font-medium text-blue-900">{plan.expectedReturn}</p>
                      </div>
                      <div>
                        <span className="text-blue-600">Time Horizon:</span>
                        <p className="font-medium text-blue-900">{plan.timeHorizon}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-blue-600 mb-2">Recommended Allocation</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(plan.allocation).map(([asset, percentage]) => (
                          <div key={asset} className="flex justify-between text-blue-900">
                            <span className="capitalize">{asset}:</span>
                            <span>{percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-blue-600 mb-2">Key Strategies</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-blue-900">
                        {plan.strategies.map((strategy, idx) => (
                          <li key={idx}>{strategy}</li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-sm text-blue-600">{plan.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialHealthAssessment;