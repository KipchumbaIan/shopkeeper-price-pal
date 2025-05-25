
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
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">₦{lowestPrice}</p>
          <p className="text-sm text-gray-500">per {unit}</p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {suppliers} supplier{suppliers !== 1 ? 's' : ''}
        </div>
        
        <div className={`flex items-center text-sm ${isPositive ? 'text-red-600' : 'text-green-600'}`}>
          {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
          {Math.abs(priceChange)}% {isPositive ? 'increase' : 'decrease'}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
