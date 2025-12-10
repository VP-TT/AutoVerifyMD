
import React from 'react';
import { LayoutDashboard, FileCheck, AlertOctagon, FileText, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;
  const baseClass = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";
  const activeClass = "bg-blue-50 text-blue-600 font-medium";
  const inactiveClass = "text-gray-600 hover:bg-gray-50 font-medium";

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white h-screen shadow-md flex flex-col sticky top-0">
      <div className="p-6 flex-1">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="text-xl font-bold text-gray-800">AutoVerifyMD</span>
        </div>

        <nav className="space-y-2">
          <Link to="/dashboard" className={`${baseClass} ${isActive('/dashboard') ? activeClass : inactiveClass} `}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/runs" className={`${baseClass} ${isActive('/runs') ? activeClass : inactiveClass} `}>
            <FileCheck size={20} />
            <span>Validation Runs</span>
          </Link>
          <Link to="/flagged" className={`${baseClass} ${isActive('/flagged') ? activeClass : inactiveClass} `}>
            <AlertOctagon size={20} />
            <span>Flagged Records</span>
          </Link>
          <Link to="/reports" className={`${baseClass} ${isActive('/reports') ? activeClass : inactiveClass} `}>
            <FileText size={20} />
            <span>Reports</span>
          </Link>
        </nav>
      </div>

      <div className="p-6 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors font-medium"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

