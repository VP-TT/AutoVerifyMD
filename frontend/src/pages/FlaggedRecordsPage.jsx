import React, { useEffect, useState } from 'react';
import { getProviders, verifyProvider } from '../api';
import Sidebar from '../components/Sidebar';
import ProviderTable from '../components/ProviderTable';
import { Bell, User } from 'lucide-react';

const FlaggedRecordsPage = () => {
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
      alert(`Starting verification for ${provider.first_name} ${provider.last_name}...`);
      await verifyProvider(provider);
      fetchProviders();
    } catch (error) {
      console.error("Verification failed", error);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center mb-6">
          <div className="text-xl font-semibold text-gray-800">Flagged Records</div>
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-semibold text-lg text-gray-800">All Flagged Providers</h3>
            </div>
            {loading ? (
              <p className="p-6">Loading...</p>
            ) : (
              <ProviderTable providers={providers} onVerify={handleVerify} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlaggedRecordsPage;
