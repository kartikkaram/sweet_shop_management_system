'use client';

import { useState } from 'react';
import useSweetStore from '../store/sweetStore';
import SweetCard from './SweetCard';
import SweetForm from './SweetForm';
import SearchAndSort from './SearchAndSort';
import { Store, Plus, AlertCircle, TrendingUp, Package, DollarSign } from 'lucide-react';

export default function OwnerSection() {
  const { sweets, addSweet, updateSweet, deleteSweet, restockSweet, searchSweets, sortSweets } = useSweetStore();
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [message, setMessage] = useState('');

  const handleAddSweet = (sweetData) => {
    try {
      addSweet(sweetData);
      setShowForm(false);
      setMessage('Sweet added successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleUpdateSweet = (sweetData) => {
    try {
      updateSweet(editingSweet.id, sweetData);
      setEditingSweet(null);
      setShowForm(false);
      setMessage('Sweet updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteSweet = (id) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      try {
        deleteSweet(id);
        setMessage('Sweet deleted successfully!');
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage(error.message);
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const handleRestockSweet = (id, amount) => {
    try {
      restockSweet(id, amount);
      setMessage(`Successfully restocked ${amount} item(s)!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEditSweet = (sweet) => {
    setEditingSweet(sweet);
    setShowForm(true);
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
  
  // Analytics
  const totalSweets = sweets.length;
  const totalValue = sweets.reduce((sum, sweet) => sum + (sweet.price * sweet.quantity), 0);
  const lowStockItems = sweets.filter(sweet => sweet.quantity <= 10).length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Store className="text-purple-600" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Shop Management</h2>
        </div>
        <p className="text-gray-600">Manage your sweet inventory and track performance</p>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Products</p>
              <p className="text-2xl font-bold">{totalSweets}</p>
            </div>
            <Package className="text-blue-200" size={32} />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Inventory Value</p>
              <p className="text-2xl font-bold">₹ {totalValue.toFixed(2)}</p>
            </div>
            <DollarSign className="text-green-200" size={32} />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Low Stock Alert</p>
              <p className="text-2xl font-bold">{lowStockItems}</p>
            </div>
            <TrendingUp className="text-orange-200" size={32} />
          </div>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-2 ${
          message.includes('successfully') || message.includes('Successfully')
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          <AlertCircle size={20} />
          {message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-1">
          <SearchAndSort
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />
        </div>
        
        <button
          onClick={() => {
            setEditingSweet(null);
            setShowForm(true);
          }}
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
        >
          <Plus size={20} />
          Add New Sweet
        </button>
      </div>

      {displayedSweets.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Store size={64} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No sweets found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first sweet to the inventory'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedSweets.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              isOwner={true}
              onEdit={handleEditSweet}
              onDelete={handleDeleteSweet}
              onRestock={handleRestockSweet}
            />
          ))}
        </div>
      )}

      {showForm && (
        <SweetForm
          sweet={editingSweet}
          onSubmit={editingSweet ? handleUpdateSweet : handleAddSweet}
          onCancel={() => {
            setShowForm(false);
            setEditingSweet(null);
          }}
        />
      )}
    </div>
  );
}