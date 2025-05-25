
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface AddProductFormProps {
  onSubmit: (product: any) => void;
  onCancel: () => void;
}

const AddProductForm = ({ onSubmit, onCancel }: AddProductFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    unit: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', category: '', unit: '', description: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Rice, Cooking Oil"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="category">Category *</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Grains, Dairy, Beverages"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="unit">Unit of Measurement *</Label>
          <Input
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="e.g., kg, liter, bag"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Additional details about the product"
          />
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1">
            Add Product
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddProductForm;
