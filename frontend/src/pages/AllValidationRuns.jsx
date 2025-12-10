import React from 'react';
import Sidebar from '../components/Sidebar';
import { Bell, User } from 'lucide-react';

const AllValidationRuns = () => {
  // Extended mock data
  const runs = [
    { id: '#1257', date: '04/23/2024', status: 'Completed', processed: 150, user: 'Admin' },
    { id: '#1258', date: '04/23/2024', status: 'Completed', processed: 120, user: 'System' },
    { id: '#1252', date: '04/23/2024', status: 'In Progress', processed: 150, user: 'Admin' },
    { id: '#1244', date: '04/23/2024', status: 'Completed', processed: 130, user: 'System' },
    { id: '#1213', date: '04/16/2024', status: 'Completed', processed: 115, user: 'Admin' },
    { id: '#1210', date: '04/15/2024', status: 'Completed', processed: 90, user: 'Admin' },
    { id: '#1205', date: '04/14/2024', status: 'Failed', processed: 45, user: 'System' },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center mb-6">
          <div className="text-xl font-semibold text-gray-800">Validation Runs History</div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <User size={20} />
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800">All Runs</h3>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="py-4 px-6 text-sm font-bold text-gray-600">Run ID</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-600">Date</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-600">Initiated By</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-600">Status</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-600 text-right">Providers Processed</th>
                </tr>
              </thead>
              <tbody>
                {runs.map((run) => (
                  <tr key={run.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-blue-600">{run.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{run.date}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{run.user}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-xs font-medium 
                                                ${run.status === 'Completed' ? 'bg-green-50 text-green-700' :
                          run.status === 'In Progress' ? 'bg-amber-50 text-amber-700' :
                            'bg-red-50 text-red-700'}`}>
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
      </main>
    </div>
  );
};

export default AllValidationRuns;
