
import React, { useState } from 'react';
import { Plus, Package, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AddProductForm from '../components/AddProductForm';

const Products = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([
    { id: '1', name: 'Rice (Local)', category: 'Grains', unit: 'kg', description: 'Local Nigerian rice', suppliers: 5 },
    { id: '2', name: 'Palm Oil', category: 'Cooking Oil', unit: 'liter', description: 'Pure palm oil', suppliers: 3 },
    { id: '3', name: 'Beans', category: 'Legumes', unit: 'kg', description: 'Brown beans', suppliers: 4 },
    { id: '4', name: 'Garri', category: 'Grains', unit: 'kg', description: 'White garri', suppliers: 6 },
  ]);

  const handleAddProduct = (productData: any) => {
    const newProduct = {
      id: Date.now().toString(),
      ...productData,
      suppliers: 0
    };
    setProducts(prev => [...prev, newProduct]);
    setShowAddForm(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Manage your product catalog and track supplier prices</p>
        </div>

        {showAddForm ? (
          <div className="mb-8">
            <AddProductForm
              onSubmit={handleAddProduct}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        ) : (
          <div className="mb-8">
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Unit:</span>
                  <span className="text-sm font-medium">{product.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Suppliers:</span>
                  <span className="text-sm font-medium">{product.suppliers}</span>
                </div>
                {product.description && (
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  View Prices
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
