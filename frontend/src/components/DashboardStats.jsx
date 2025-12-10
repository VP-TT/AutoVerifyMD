import React from 'react';

const StatCard = ({ title, value, subtext }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <h3 className="text-gray-500 font-medium mb-2">{title}</h3>
    <div className="text-3xl font-bold text-gray-800 mb-1">{value}</div>
    {subtext && <div className="text-sm text-gray-400">{subtext}</div>}
  </div>
);

const DashboardStats = ({ providerCount, verifiedCount, averageScore }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard title="Validation Runs" value="25" />
      <StatCard title="Providers Validated" value={providerCount} />
      <StatCard title="Flagged Records" value={providerCount - verifiedCount} />
      <StatCard title="Compliance Reports" value="12" />
    </div>
  );
};

export default DashboardStats;
