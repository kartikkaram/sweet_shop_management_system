'use client';

import { Search, SortAsc } from 'lucide-react';

export default function SearchAndSort({ searchTerm, onSearchChange, sortOption, onSortChange }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or category..."
            className="w-full  text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <SortAsc className="absolute  left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="pl-10  text-black pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white min-w-[200px]"
          >
            <option value="">Sort by...</option>
            <option value="PRICELOWTOHIGH">Price: Low to High</option>
            <option value="PRICEHIGHTOLOW">Price: High to Low</option>
            <option value="QUANTITYLOWTOHIGH">Quantity: Low to High</option>
            <option value="QUANTITYHIGHTOLOW">Quantity: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}