import React from 'react';
import { LayoutDashboard, FileCheck, AlertOctagon, FileText } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen shadow-md flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="text-xl font-bold text-gray-800">AutoVerifyMD</span>
        </div>

        <nav className="space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg">
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <FileCheck size={20} />
            <span className="font-medium">Validation Runs</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <AlertOctagon size={20} />
            <span className="font-medium">Flagged Records</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <FileText size={20} />
            <span className="font-medium">Reports</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
