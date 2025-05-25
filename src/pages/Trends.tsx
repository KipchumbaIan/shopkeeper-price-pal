
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Trends = () => {
  // Sample price trend data
  const priceData = [
    { date: '2024-01-01', rice: 420, palmOil: 750, beans: 380 },
    { date: '2024-01-08', rice: 430, palmOil: 770, beans: 375 },
    { date: '2024-01-15', rice: 425, palmOil: 780, beans: 390 },
    { date: '2024-01-22', rice: 450, palmOil: 800, beans: 385 },
    { date: '2024-01-29', rice: 445, palmOil: 820, beans: 370 },
    { date: '2024-02-05', rice: 460, palmOil: 810, beans: 350 },
  ];

  const supplierComparison = [
    { supplier: 'Alhaji Musa', rice: 450, palmOil: 800, beans: 350 },
    { supplier: 'Mama Kemi', rice: 480, palmOil: 850, beans: 380 },
    { supplier: 'Chief Okafor', rice: 470, palmOil: 820, beans: 370 },
    { supplier: 'Trader Joe', rice: 465, palmOil: 830, beans: 365 },
  ];

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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="palmOil">Palm Oil</SelectItem>
                  <SelectItem value="beans">Beans</SelectItem>
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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>
                  <SelectItem value="musa">Alhaji Musa</SelectItem>
                  <SelectItem value="kemi">Mama Kemi</SelectItem>
                  <SelectItem value="okafor">Chief Okafor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Price Trend Chart */}
        <Card className="p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Price Trends Over Time</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rice" stroke="#3B82F6" strokeWidth={2} name="Rice (₦/kg)" />
                <Line type="monotone" dataKey="palmOil" stroke="#10B981" strokeWidth={2} name="Palm Oil (₦/liter)" />
                <Line type="monotone" dataKey="beans" stroke="#F59E0B" strokeWidth={2} name="Beans (₦/kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Supplier Comparison */}
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
                <Bar dataKey="rice" fill="#3B82F6" name="Rice (₦/kg)" />
                <Bar dataKey="palmOil" fill="#10B981" name="Palm Oil (₦/liter)" />
                <Bar dataKey="beans" fill="#F59E0B" name="Beans (₦/kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Trends;
