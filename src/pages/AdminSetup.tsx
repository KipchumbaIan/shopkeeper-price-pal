
import React from 'react';
import AdminSetup from '@/components/AdminSetup';
import Header from '@/components/Header';

const AdminSetupPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Setup</h1>
          <p className="text-gray-600">Set up admin access for PricePal</p>
        </div>
        <AdminSetup />
      </div>
    </div>
  );
};

export default AdminSetupPage;
