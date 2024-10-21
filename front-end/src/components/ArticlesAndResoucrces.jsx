import React from 'react';
const ArticlesAndResources = () => {
    const resources = [
        {
          title: "The Importance of Retirement Planning",
          url: "https://www.investopedia.com/terms/r/retirement-planning.asp",
          description: "An overview of why planning for retirement is crucial and how to start."
        },
        {
          title: "Financial Literacy: Why It Matters",
          url: "https://www.khanacademy.org/college-careers-more/personal-finance",
          description: "A comprehensive guide to understanding personal finance and improving financial literacy."
        },
        {
          title: "Top 10 Retirement Planning Tips",
          url: "https://www.nerdwallet.com/article/investing/retirement-planning-tips",
          description: "Essential tips to help you navigate your retirement planning journey."
        },
        {
          title: "Understanding Investment Basics",
          url: "https://www.investopedia.com/investing-101-5183084",
          description: "A beginner's guide to investing, including key concepts and strategies."
        },
        {
          title: "Social Security Benefits Explained",
          url: "https://www.ssa.gov/benefits/retirement/",
          description: "Everything you need to know about Social Security benefits and how they impact retirement."
        }
      ];
      
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Articles and Resources on Retirement Planning and Financial Literacy</h1>
      <p className="mb-6 text-gray-600">
        Understanding retirement planning and financial literacy is vital for a secure financial future. Here are some resources to help you get started:
      </p>
      <ul className="space-y-6">
        {resources.map((resource, index) => (
          <li key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-gray-800">{resource.title}</h2>
            <p className="mt-2 text-gray-600">{resource.description}</p>
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-2 inline-block text-blue-500 hover:underline"
            >
            Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesAndResources;
