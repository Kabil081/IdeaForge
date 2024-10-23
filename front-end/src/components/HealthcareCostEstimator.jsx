import React, { useState } from 'react';

const HealthcareCostEstimator = () => {
  const [age, setAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [estimatedCosts, setEstimatedCosts] = useState(null);
  const [inflationRate, setInflationRate] = useState(5); // Default inflation rate

  const estimateHealthcareCosts = (age, retirementAge, inflationRate) => {
    const averageCosts = {
      60: 25000,
      65: 30000,
      70: 35000,
      75: 40000,
      80: 45000,
      85: 50000
    };

    const yearsInRetirement = 85 - retirementAge;
    let totalCosts = 0;

    for (let year = 0; year < yearsInRetirement; year++) {
      const ageAtYear = retirementAge + year;
      const costForYear = averageCosts[ageAtYear] || 50000; // Default for ages > 85
      totalCosts += costForYear * Math.pow(1 + inflationRate / 100, year);
    }

    return totalCosts;
  };

  const calculateCosts = () => {
    if (age && retirementAge && currentSavings) {
      const costs = estimateHealthcareCosts(
        parseInt(age),
        parseInt(retirementAge),
        inflationRate
      );
      setEstimatedCosts(costs);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Healthcare Cost Estimator</h1>
      
      <div className="mb-4">
        <label className="block mb-1">Current Age:</label>
        <input
          type="number"
          placeholder="e.g., 65"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Retirement Age:</label>
        <input
          type="number"
          placeholder="e.g., 70"
          value={retirementAge}
          onChange={(e) => setRetirementAge(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Current Savings (₹):</label>
        <input
          type="number"
          placeholder="e.g., 50000"
          value={currentSavings}
          onChange={(e) => setCurrentSavings(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Inflation Rate (%):</label>
        <input
          type="number"
          value={inflationRate}
          onChange={(e) => setInflationRate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={calculateCosts}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        Estimate Costs
      </button>

      {estimatedCosts !== null && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <h2 className="text-lg font-semibold">Estimated Healthcare Costs:</h2>
          <p className="text-xl font-bold">₹{estimatedCosts.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default HealthcareCostEstimator;
