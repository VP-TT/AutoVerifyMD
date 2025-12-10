import React from 'react';
import Sidebar from '../components/Sidebar';
import Reports from '../components/Reports';
import { Bell, User } from 'lucide-react';

const ReportsPage = () => {
  const username = localStorage.getItem('username') || 'Administrator';

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center mb-6">
          <div className="text-xl font-semibold text-gray-800">Reports</div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-gray-600">{username}</div>
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <User size={20} />
            </div>
          </div>
        </header>

        <div className="p-8">
          <Reports />
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
