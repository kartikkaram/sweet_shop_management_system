'use client';

import { ShoppingCart, Package, Edit, Trash2 } from 'lucide-react';
import { DialogBox } from './dialogbox';
import { Button } from './ui/button';
import Image from 'next/image';

export default function SweetCard({ sweet, isOwner, onPurchase, onEdit, onDelete, onRestock }) {
  const handlePurchase = (amount) => {
    if (amount && amount > 0) {
      onPurchase(sweet.id, amount);
    }
  };

  const handleRestock = (amount) => {
    if (amount && amount > 0) {
      onRestock(sweet.id, amount);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
<Image
  src={sweet.image || 'https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=400'}
  alt={sweet.name}
  width={400}
  height={300}
  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
/>

        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            sweet.quantity > 10 ? 'bg-green-100 text-green-800' : 
            sweet.quantity > 0 ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'
          }`}>
            {sweet.quantity > 0 ? `${sweet.quantity} left` : 'Out of stock'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 truncate">{sweet.name}</h3>
          <span className="text-xl font-bold text-pink-600">₹ {sweet.price.toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-2 capitalize">{sweet.category}</p>
        
        {sweet.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{sweet.description}</p>
        )}
        
        <div className="flex gap-2">
          {!isOwner ? (
            <DialogBox
               label={"Purchase"}
               label2={"Purchase"}
               sweet={sweet}
               description={"Purchase your sweets"}
               color={"bg-green-600"}
               handleSubmit={handlePurchase}
               defaultValue={1}
               Icon={ShoppingCart}
             />
          ) : (
            <>
              <Button
                onClick={() => onEdit(sweet)}
                className="flex-1 bg-blue-500 text-white px-1 py- rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
              >
                <Edit size={12} />
                Edit
              </Button>
             <DialogBox
               label={"Restock"}
               label2={"Restock"}
               sweet={sweet}
               description={"Restock your sweets"}
               color={"bg-green-600"}
               handleSubmit={handleRestock}
               defaultValue={10}
               Icon={Package}
             />
              <button
                onClick={() => onDelete(sweet.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}