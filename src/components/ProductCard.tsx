
import React from 'react';
import { Package, TrendingDown, TrendingUp } from 'lucide-react';

interface ProductCardProps {
  name: string;
  category: string;
  lowestPrice: number;
  suppliers: number;
  priceChange: number;
  unit: string;
}

const ProductCard = ({ name, category, lowestPrice, suppliers, priceChange, unit }: ProductCardProps) => {
  const isPositive = priceChange >= 0;
  
  return (
    <div className="bg-white rounded-xl shadow-lg border-0 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{name}</h3>
            <p className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{category}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-right">
          <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">₦{lowestPrice}</p>
          <p className="text-sm text-gray-500">per {unit}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-600">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          {suppliers} supplier{suppliers !== 1 ? 's' : ''}
        </div>
        
        <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-full ${
          isPositive ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100'
        }`}>
          {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
          {Math.abs(priceChange)}%
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
