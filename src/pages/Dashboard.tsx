
import React from 'react';
import { Plus, AlertTriangle, TrendingUp } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import PriceComparisonTable from '../components/PriceComparisonTable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  // Sample data - in real app this would come from API
  const products = [
    { name: 'Rice (Local)', category: 'Grains', lowestPrice: 450, suppliers: 5, priceChange: -5.2, unit: 'kg' },
    { name: 'Palm Oil', category: 'Cooking Oil', lowestPrice: 800, suppliers: 3, priceChange: 2.1, unit: 'liter' },
    { name: 'Beans', category: 'Legumes', lowestPrice: 350, suppliers: 4, priceChange: -1.5, unit: 'kg' },
    { name: 'Garri', category: 'Grains', lowestPrice: 200, suppliers: 6, priceChange: 0.8, unit: 'kg' },
  ];

  const priceData = [
    { id: '1', supplier: 'Alhaji Musa', product: 'Rice (Local)', price: 450, unit: 'kg', lastUpdated: 'Today', isLowest: true },
    { id: '2', supplier: 'Mama Kemi', product: 'Rice (Local)', price: 480, unit: 'kg', lastUpdated: 'Yesterday', isLowest: false },
    { id: '3', supplier: 'Chief Okafor', product: 'Palm Oil', price: 800, unit: 'liter', lastUpdated: 'Today', isLowest: true },
    { id: '4', supplier: 'Trader Joe', product: 'Palm Oil', price: 850, unit: 'liter', lastUpdated: '2 days ago', isLowest: false },
  ];

  const alerts = [
    { message: 'Rice prices dropped 5% at Alhaji Musa', type: 'success' },
    { message: 'Palm Oil prices increased 2% market-wide', type: 'warning' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track and compare supplier prices for smarter purchasing decisions</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Suppliers</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg. Savings</p>
                <p className="text-2xl font-bold text-gray-900">₦2,500</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Price Alerts */}
        {alerts.length > 0 && (
          <Card className="p-6 mb-8">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              <h2 className="text-lg font-semibold">Price Alerts</h2>
            </div>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    alert.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-orange-50 text-orange-800'
                  }`}
                >
                  {alert.message}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Products</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>

        {/* Price Comparison Table */}
        <PriceComparisonTable data={priceData} />
      </div>
    </div>
  );
};

export default Dashboard;
