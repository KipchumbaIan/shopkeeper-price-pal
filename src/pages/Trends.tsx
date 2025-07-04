
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLatestPrices } from '../hooks/useLatestPrices';
import { useProducts } from '../hooks/useProducts';
import { useSuppliers } from '../hooks/useSuppliers';

const Trends = () => {
  const { latestPrices, isLoading } = useLatestPrices();
  const { products } = useProducts();
  const { suppliers } = useSuppliers();
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trends...</p>
        </div>
      </div>
    );
  }

  // Group price data by date for trend chart
  const priceData = latestPrices
    .filter(price => selectedProduct === 'all' || price.product_id === selectedProduct)
    .filter(price => selectedSupplier === 'all' || price.supplier_id === selectedSupplier)
    .reduce((acc, price) => {
      const date = new Date(price.created_at).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date };
      }
      acc[date][price.product_name] = price.price;
      return acc;
    }, {} as Record<string, any>);

  const trendData = Object.values(priceData).sort((a: any, b: any) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Create supplier comparison data
  const supplierComparison = suppliers.map(supplier => {
    const supplierPrices = latestPrices.filter(price => price.supplier_id === supplier.id);
    const comparison = { supplier: supplier.name };
    
    products.forEach(product => {
      const productPrice = supplierPrices.find(price => price.product_id === product.id);
      if (productPrice) {
        comparison[product.name] = productPrice.price;
      }
    });
    
    return comparison;
  }).filter(supplier => Object.keys(supplier).length > 1);

  // Get unique product names for chart colors
  const uniqueProducts = Array.from(new Set(latestPrices.map(price => price.product_name)));
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Price Trends</h1>
          <p className="text-gray-600">Analyze price movements and market trends to make informed decisions</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
              <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Price Trend Chart */}
        {trendData.length > 0 ? (
          <Card className="p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Price Trends Over Time</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {uniqueProducts.map((product, index) => (
                    <Line 
                      key={product}
                      type="monotone" 
                      dataKey={product} 
                      stroke={colors[index % colors.length]} 
                      strokeWidth={2} 
                      name={`${product} (KSh)`}
                      connectNulls={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ) : (
          <Card className="p-6 mb-8 text-center">
            <h2 className="text-lg font-semibold mb-2">No price data available</h2>
            <p className="text-gray-600">Add some price entries to see trends over time.</p>
          </Card>
        )}

        {/* Supplier Comparison */}
        {supplierComparison.length > 0 ? (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Current Price Comparison by Supplier</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={supplierComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="supplier" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {uniqueProducts.map((product, index) => (
                    <Bar 
                      key={product}
                      dataKey={product} 
                      fill={colors[index % colors.length]} 
                      name={`${product} (KSh)`}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        ) : (
          <Card className="p-6 text-center">
            <h2 className="text-lg font-semibold mb-2">No supplier comparison data available</h2>
            <p className="text-gray-600">Add price entries for multiple suppliers to see comparisons.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Trends;
