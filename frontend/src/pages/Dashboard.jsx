import React, { useEffect, useState } from 'react';
import { getProviders, verifyProvider } from '../api';
import ProviderTable from '../components/ProviderTable';
import Sidebar from '../components/Sidebar';
import DashboardStats from '../components/DashboardStats';
import Charts from '../components/Charts';
import ValidationRuns from '../components/ValidationRuns';
import { Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem('username') || 'Administrator';

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const data = await getProviders();
      setProviders(data);
    } catch (error) {
      console.error("Failed to fetch providers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleVerify = async (provider) => {
    try {
      // Optimistic update or alert
      alert(`Starting verification for ${provider.first_name} ${provider.last_name}...`);
      await verifyProvider(provider);
      // In a real app we'd use WebSocket or polling here
      fetchProviders();
    } catch (error) {
      console.error("Verification failed", error);
    }
  };

  const verifiedCount = providers.filter(p => p.is_verified).length;
  // Calculate average score for verified providers
  const totalScore = providers.reduce((acc, p) => acc + (p.verification_score || 0), 0);
  const averageScore = providers.length ? Math.round(totalScore / providers.length) : 0;

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center mb-6">
          <div className="text-xl font-semibold text-gray-800">Hello, {username}</div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <User size={20} />
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <DashboardStats
            providerCount={providers.length}
            verifiedCount={verifiedCount}
            averageScore={averageScore}
          />

          {/* Main Content Grid: Validation Runs (Left) & Flagged Records (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Validation Runs */}
            <div className="lg:col-span-2">
              <ValidationRuns />
            </div>

            {/* Right Column: Flagged Records */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-gray-800">Flagged Records</h3>
                  <Link to="/flagged" className="text-blue-500 text-sm font-medium hover:text-blue-600">Action</Link>
                </div>
                {loading ? (
                  <p className="p-6">Loading...</p>
                ) : (
                  <ProviderTable providers={providers} onVerify={handleVerify} />
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row: Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3">
              <Charts providers={providers} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
