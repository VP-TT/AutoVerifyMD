import React from 'react';

const ProviderTable = ({ providers, onVerify }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="py-4 px-6 text-sm font-semibold text-gray-600">Provider Name</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-600">Issue</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-600">Confidence</th>
            <th className="py-4 px-6 text-sm font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="py-4 px-6">
                <div className="font-medium text-gray-900">{provider.first_name} {provider.last_name}</div>
                <div className="text-xs text-gray-400">{provider.specialty}</div>
              </td>
              <td className="py-4 px-6 text-sm text-gray-600">
                {provider.is_verified ? (
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs">Verified</span>
                ) : (
                  <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs">Pending Verification</span>
                )}
              </td>
              <td className="py-4 px-6 font-medium text-gray-700">
                {provider.verification_score > 0 ? `${provider.verification_score}%` : '-'}
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={() => onVerify(provider)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors"
                >
                  {provider.is_verified ? 'Review' : 'Verify'}
                </button>
              </td>
            </tr>
          ))}
          {providers.length === 0 && (
            <tr>
              <td colSpan="4" className="py-8 text-center text-gray-400">No providers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProviderTable;
