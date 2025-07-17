'use client';

import { useState } from 'react';
import CustomerSection from '../components/CustomerSection';
import OwnerSection from '../components/OwnerSection';
import { User, Crown, Candy } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('customer');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-lg">
                <Candy className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Sweet Shop</h1>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('customer')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'customer'
                    ? 'bg-white text-pink-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <User size={18} />
                Customer
              </button>
              <button
                onClick={() => setActiveTab('owner')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'owner'
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Crown size={18} />
                Shop Owner
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'customer' ? <CustomerSection /> : <OwnerSection />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; 2025 Sweet Shop Management System. Built with Next.js.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}