
import React from 'react';
import { Plus, AlertTriangle, TrendingUp, Package, Users, DollarSign } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with enhanced styling */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600">Track and compare supplier prices for smarter purchasing decisions</p>
        </div>

        {/* Quick Stats with enhanced design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-blue-100">Total Products</p>
                <p className="text-3xl font-bold text-white">{products.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-green-100">Active Suppliers</p>
                <p className="text-3xl font-bold text-white">12</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-purple-100">Avg. Savings</p>
                <p className="text-3xl font-bold text-white">₦2,500</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Price Alerts with enhanced styling */}
        {alerts.length > 0 && (
          <Card className="p-6 mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="text-xl font-semibold ml-3 text-gray-800">Price Alerts</h2>
            </div>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-l-4 transition-all duration-300 hover:shadow-md ${
                    alert.type === 'success' 
                      ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-500 text-green-800' 
                      : 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-500 text-orange-800'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      alert.type === 'success' ? 'bg-green-500' : 'bg-orange-500'
                    }`}></div>
                    {alert.message}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Products Grid with enhanced header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Products</h2>
              <p className="text-gray-600">Manage and track your product inventory</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div 
                key={index} 
                className="animate-scale-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>

        {/* Price Comparison Table with enhanced styling */}
        <div className="animate-fade-in">
          <PriceComparisonTable data={priceData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
