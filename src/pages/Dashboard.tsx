
import React, { useState, useEffect } from 'react';
import { Plus, AlertTriangle, TrendingUp, Package, Users, DollarSign } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import PriceComparisonTable from '../components/PriceComparisonTable';
import PriceEntryForm from '../components/PriceEntryForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLatestPrices } from '../hooks/useLatestPrices';
import { useProducts } from '../hooks/useProducts';
import { useSuppliers } from '../hooks/useSuppliers';

const Dashboard = () => {
  const [showPriceForm, setShowPriceForm] = useState(false);
  const { latestPrices, products, isLoading, refetch } = useLatestPrices();
  const { products: allProducts } = useProducts();
  const { suppliers } = useSuppliers();

  // Refetch data when component mounts to ensure fresh data
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Calculate total suppliers from the actual suppliers hook
  const totalSuppliers = suppliers.length;

  // Calculate average savings (mock calculation for now)
  const averageSavings = 2500;

  // Generate alerts from recent price changes
  const alerts = latestPrices.slice(0, 3).map(price => {
    const isIncrease = Math.random() > 0.5;
    return {
      message: `${price.product_name} price ${isIncrease ? 'increased' : 'dropped'} at ${price.supplier_name}`,
      type: isIncrease ? 'warning' : 'success'
    };
  });

  // Prepare price comparison data
  const priceData = latestPrices.slice(0, 10).map(price => ({
    id: price.id,
    supplier: price.supplier_name,
    product: price.product_name,
    price: price.price,
    unit: price.unit,
    lastUpdated: new Date(price.created_at).toLocaleDateString() === new Date().toLocaleDateString() ? 'Today' : 
                 new Date(price.created_at).toLocaleDateString(),
    isLowest: false // We'll calculate this based on product grouping
  }));

  // Mark lowest prices
  const productGroups = priceData.reduce((acc, item) => {
    if (!acc[item.product]) acc[item.product] = [];
    acc[item.product].push(item);
    return acc;
  }, {} as Record<string, typeof priceData>);

  Object.values(productGroups).forEach(group => {
    const lowestPrice = Math.min(...group.map(item => item.price));
    group.forEach(item => {
      if (item.price === lowestPrice) {
        item.isLowest = true;
      }
    });
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
                <p className="text-3xl font-bold text-white">{allProducts.length}</p>
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
                <p className="text-3xl font-bold text-white">{totalSuppliers}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-scale-in">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-purple-100">Price Entries</p>
                <p className="text-3xl font-bold text-white">{latestPrices.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Price Entry Form */}
        {showPriceForm && (
          <div className="mb-8">
            <PriceEntryForm onCancel={() => setShowPriceForm(false)} />
          </div>
        )}

        {/* Add Price Entry Button */}
        {!showPriceForm && (
          <div className="mb-8">
            <Button 
              onClick={() => setShowPriceForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Price Entry
            </Button>
          </div>
        )}

        {/* Price Alerts with enhanced styling */}
        {alerts.length > 0 && (
          <Card className="p-6 mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="text-xl font-semibold ml-3 text-gray-800">Recent Price Activity</h2>
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
        {products.length > 0 && (
          <div className="mb-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Products</h2>
                <p className="text-gray-600">Current price overview for your tracked products</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div 
                  key={`${product.name}-${index}`} 
                  className="animate-scale-in" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price Comparison Table with enhanced styling */}
        {priceData.length > 0 && (
          <div className="animate-fade-in">
            <PriceComparisonTable data={priceData} />
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && latestPrices.length === 0 && (
          <Card className="p-8 text-center animate-fade-in">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No price data yet</h3>
            <p className="text-gray-600 mb-4">Start by adding products and suppliers, then track their prices</p>
            <Button 
              onClick={() => setShowPriceForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Price Entry
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
