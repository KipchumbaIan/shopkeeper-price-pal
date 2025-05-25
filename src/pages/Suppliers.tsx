
import React, { useState } from 'react';
import { Plus, Users, Phone, MapPin, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Suppliers = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [suppliers, setSuppliers] = useState([
    { 
      id: '1', 
      name: 'Alhaji Musa', 
      contact: '+234 801 234 5678', 
      location: 'Kano Market', 
      products: ['Rice', 'Beans', 'Garri'],
      rating: 4.5
    },
    { 
      id: '2', 
      name: 'Mama Kemi', 
      contact: '+234 802 345 6789', 
      location: 'Lagos Island', 
      products: ['Palm Oil', 'Rice'],
      rating: 4.2
    },
    { 
      id: '3', 
      name: 'Chief Okafor', 
      contact: '+234 803 456 7890', 
      location: 'Onitsha Market', 
      products: ['Palm Oil', 'Beans'],
      rating: 4.7
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSupplier = {
      id: Date.now().toString(),
      ...formData,
      products: [],
      rating: 0
    };
    setSuppliers(prev => [...prev, newSupplier]);
    setFormData({ name: '', contact: '', location: '', email: '' });
    setShowAddForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleDeleteSupplier = (id: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Suppliers</h1>
          <p className="text-gray-600">Manage your supplier network and their contact information</p>
        </div>

        {showAddForm ? (
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Add New Supplier</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Supplier Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Alhaji Musa"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="contact">Phone Number *</Label>
                  <Input
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="e.g., +234 801 234 5678"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Kano Market"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="supplier@email.com"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Add Supplier
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <div className="mb-8">
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Supplier
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier) => (
            <Card key={supplier.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {supplier.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteSupplier(supplier.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{supplier.contact}</span>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Products:</p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.products.map((product, index) => (
                      <span 
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
                
                {supplier.rating > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-600">Rating: </span>
                    <span className="font-medium">{supplier.rating}/5.0</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  Add Price Entry
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
