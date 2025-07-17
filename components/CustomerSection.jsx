'use client';

import { useState } from 'react';
import useSweetStore from '../store/sweetStore';
import SweetCard from './SweetCard';
import SearchAndSort from './SearchAndSort';
import { ShoppingBag, AlertCircle } from 'lucide-react';

export default function CustomerSection() {
  const { sweets, purchaseSweet, searchSweets, sortSweets } = useSweetStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [message, setMessage] = useState('');

  const handlePurchase = (id, amount) => {
    try {
      purchaseSweet(id, amount);
      setMessage(`Successfully purchased ${amount} item(s)!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const getDisplayedSweets = () => {
    let result = sweets;
    
    if (searchTerm) {
      result = searchSweets(searchTerm);
    }
    
    if (sortOption) {
      result = sortSweets(sortOption);
      if (searchTerm) {
        result = result.filter(sweet => 
          sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          sweet.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }
    
    return result;
  };

  const displayedSweets = getDisplayedSweets();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ShoppingBag className="text-pink-600" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Sweet Shop</h2>
        </div>
        <p className="text-gray-600">Discover and purchase delicious sweets from our collection</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-2 ${
          message.includes('Successfully') 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          <AlertCircle size={20} />
          {message}
        </div>
      )}

      <SearchAndSort
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {displayedSweets.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <ShoppingBag size={64} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No sweets found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'No sweets available at the moment'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedSweets.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              isOwner={false}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      )}
    </div>
  );
}