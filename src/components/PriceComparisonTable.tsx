
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PriceData {
  id: string;
  supplier: string;
  product: string;
  price: number;
  unit: string;
  lastUpdated: string;
  isLowest?: boolean;
}

interface PriceComparisonTableProps {
  data: PriceData[];
}

const PriceComparisonTable = ({ data }: PriceComparisonTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border-0 overflow-hidden backdrop-blur-sm animate-fade-in">
      <div className="px-6 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Price Comparison</h2>
        <p className="text-gray-600 mt-1">Compare prices across different suppliers</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((item, index) => (
              <tr 
                key={item.id} 
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <div className="text-sm font-semibold text-gray-900">{item.product}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">{item.supplier}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">
                    <span className="text-lg">KSh {item.price}</span>
                    <span className="text-gray-500">/{item.unit}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                    {item.lastUpdated}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.isLowest && (
                    <Badge variant="default" className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                      🏆 Best Price
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceComparisonTable;
