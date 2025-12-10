import React from 'react';
import { Link } from 'react-router-dom';

const ValidationRuns = () => {
  const runs = [
    { id: '#1257', date: '04/23/2024', status: 'Completed', processed: 150 },
    { id: '#1258', date: '04/23/2024', status: 'Completed', processed: 120 },
    { id: '#1252', date: '04/23/2024', status: 'In Progress', processed: 150 },
    { id: '#1244', date: '04/23/2024', status: 'Completed', processed: 130 },
    { id: '#1213', date: '04/16/2024', status: 'Completed', processed: 115 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold text-lg text-gray-800">Validation Runs</h3>
        <Link to="/runs" className="text-blue-500 text-sm font-medium hover:text-blue-600">View All &gt;</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">Run ID</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">Date</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
              <th className="py-4 px-6 text-sm font-semibold text-gray-600 text-right">Providers Processed</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((run) => (
              <tr key={run.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-medium text-gray-800">{run.id}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{run.date}</td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 rounded text-xs font-medium 
                                        ${run.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                    {run.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600 text-right">{run.processed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ValidationRuns;
