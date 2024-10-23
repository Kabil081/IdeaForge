import React, { useState } from 'react';

const FinancialHealthAssessment = () => {
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

    // Evaluate Savings Rate
    if (savingsRate >= 20) score += 2;
    else if (savingsRate >= 10) score += 1;

    // Evaluate Debt Level
    if (debtLevel < 30) score += 2;
    else if (debtLevel < 50) score += 1;

    // Evaluate Retirement Readiness
    if (retirementReadiness === 'Yes') score += 2;

    const totalAllocation = Object.values(allocations).reduce((acc, val) => acc + parseFloat(val || 0), 0);

    const newAllocationFeedback = {};
    let wellDiversified = true;

    // Assess Allocation Feedback
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

    // Set investment plans based on score
    if (score >= 7) {
      setResult('Excellent');
      setInvestmentPlans([
        {
          title: 'Growth-Focused Portfolio',
          riskLevel: 'High',
          expectedReturn: '12-15% annually',
          timeHorizon: '10+ years',
          allocation: {
            stocks: { percentage: 60, link: 'https://www.investopedia.com/terms/s/stock.asp' },
            realEstate: { percentage: 20, link: 'https://www.investopedia.com/terms/r/realestate.asp' },
            crypto: { percentage: 10, link: 'https://www.coindesk.com/learn/what-is-cryptocurrency/' },
            bonds: { percentage: 10, link: 'https://www.investopedia.com/terms/b/bond.asp' }
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
            stocks: { percentage: 50, link: 'https://www.investopedia.com/terms/s/stock.asp' },
            crypto: { percentage: 20, link: 'https://www.coindesk.com/learn/what-is-cryptocurrency/' },
            venture: { percentage: 20, link: 'https://www.investopedia.com/terms/v/venturecapital.asp' },
            bonds: { percentage: 10, link: 'https://www.investopedia.com/terms/b/bond.asp' }
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
            stocks: { percentage: 40, link: 'https://www.investopedia.com/terms/s/stock.asp' },
            bonds: { percentage: 30, link: 'https://www.investopedia.com/terms/b/bond.asp' },
            realEstate: { percentage: 20, link: 'https://www.investopedia.com/terms/r/realestate.asp' },
            cash: { percentage: 10, link: 'https://www.investopedia.com/terms/c/cash.asp' }
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
            bonds: { percentage: 40, link: 'https://www.investopedia.com/terms/b/bond.asp' },
            stocks: { percentage: 30, link: 'https://www.investopedia.com/terms/s/stock.asp' },
            realEstate: { percentage: 20, link: 'https://www.investopedia.com/terms/r/realestate.asp' },
            cash: { percentage: 10, link: 'https://www.investopedia.com/terms/c/cash.asp' }
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
            bonds: { percentage: 50, link: 'https://www.investopedia.com/terms/b/bond.asp' },
            stocks: { percentage: 20, link: 'https://www.investopedia.com/terms/s/stock.asp' },
            cash: { percentage: 20, link: 'https://www.investopedia.com/terms/c/cash.asp' },
            realEstate: { percentage: 10, link: 'https://www.investopedia.com/terms/r/realestate.asp' }
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
            bonds: { percentage: 40, link: 'https://www.investopedia.com/terms/b/bond.asp' },
            stocks: { percentage: 30, link: 'https://www.investopedia.com/terms/s/stock.asp' },
            cash: { percentage: 20, link: 'https://www.investopedia.com/terms/c/cash.asp' },
            realEstate: { percentage: 10, link: 'https://www.investopedia.com/terms/r/realestate.asp' }
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
    <div className="min-h-screen bg-white text-dark p-8">
      <div className="container mx-auto max-w-screen-xl">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setActiveTab('assessment')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all text-lg ${
              activeTab === 'assessment'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'
            }`}
          >
            Assessment
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all text-lg ${
              activeTab === 'results'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-blue-600 border border-blue-300 hover:bg-blue-50'
            }`}
          >
            Results
          </button>
        </div>

        {activeTab === 'assessment' && (
          <div className="p-8 bg-accent border border-light rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Financial Health Assessment</h2>
            <div className="mb-6">
              <label htmlFor="savingsRate" className="block mb-2 text-blue-700">
                Savings Rate (% of income saved)
              </label>
              <input
                id="savingsRate"
                type="number"
                value={savingsRate}
                onChange={e => setSavingsRate(e.target.value)}
                className="w-full border border-light p-3 rounded-lg"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="debtLevel" className="block mb-2 text-blue-700">
                Debt Level (% of income spent on debt)
              </label>
              <input
                id="debtLevel"
                type="number"
                value={debtLevel}
                onChange={e => setDebtLevel(e.target.value)}
                className="w-full border border-light p-3 rounded-lg"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="retirementReadiness" className="block mb-2 text-blue-700">
                Retirement Plan in Place
              </label>
              <select
                id="retirementReadiness"
                value={retirementReadiness}
                onChange={e => setRetirementReadiness(e.target.value)}
                className="w-full border border-light p-3 rounded-lg"
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <h3 className="text-xl font-semibold mb-4 text-blue-600">Portfolio Allocation</h3>
            {['stocks', 'bonds', 'realEstate', 'crypto'].map(assetClass => (
              <div key={assetClass} className="mb-4">
                <label htmlFor={assetClass} className="block mb-2 text-blue-700 capitalize">
                  {assetClass}
                </label>
                <input
                  id={assetClass}
                  type="number"
                  value={allocations[assetClass]}
                  onChange={e => handleAllocationChange(assetClass, e.target.value)}
                  className="w-full border border-light p-3 rounded-lg"
                />
                {allocationFeedback[assetClass] && (
                  <p className="text-red-500 text-sm mt-1">
                    {allocationFeedback[assetClass]}
                  </p>
                )}
              </div>
            ))}

            <button
              onClick={assessFinancialHealth}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-transform hover:scale-105"
            >
              Assess My Financial Health
            </button>

            {diversificationResult && (
              <p className="mt-4 text-blue-700 font-semibold">
                {diversificationResult}
              </p>
            )}
          </div>
        )}

        {activeTab === 'results' && (
          <div className="p-8 bg-accent border border-light rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Results</h2>
            {result && (
              <>
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Your Financial Health: {result}</h3>
                {investmentPlans.map((plan, idx) => (
                  <div key={idx} className="mb-6 p-4 border border-blue-200 rounded-lg">
                    <h4 className="text-lg font-bold text-blue-700 mb-2">{plan.title}</h4>
                    <p className="mb-2">Risk Level: {plan.riskLevel}</p>
                    <p className="mb-2">Expected Return: {plan.expectedReturn}</p>
                    <p className="mb-2">Time Horizon: {plan.timeHorizon}</p>
                    <h5 className="font-semibold text-blue-600 mt-4">Asset Allocation:</h5>
                    <ul className="list-disc list-inside mb-2">
                      {Object.entries(plan.allocation).map(([key, value]) => (
                        <li key={key}>
                          {key}: {value.percentage}% (
                          <a href={value.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            Learn More
                          </a>)
                        </li>
                      ))}
                    </ul>
                    <h5 className="font-semibold text-blue-600 mt-4">Recommended Strategies:</h5>
                    <ul className="list-disc list-inside">
                      {plan.strategies.map((strategy, strategyIdx) => (
                        <li key={strategyIdx}>{strategy}</li>
                      ))}
                    </ul>
                    <p className="mt-5 text-red-600">{plan.description}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialHealthAssessment;
