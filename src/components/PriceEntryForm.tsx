
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProducts } from '../hooks/useProducts';
import { useSuppliers } from '../hooks/useSuppliers';
import { usePriceEntries } from '../hooks/usePriceEntries';

interface PriceEntryFormProps {
  onCancel?: () => void;
  productId?: string;
  supplierId?: string;
}

const PriceEntryForm = ({ onCancel, productId, supplierId }: PriceEntryFormProps) => {
  const { products } = useProducts();
  const { suppliers } = useSuppliers();
  const { addPriceEntry } = usePriceEntries();

  const [formData, setFormData] = useState({
    product_id: productId || '',
    supplier_id: supplierId || '',
    price: '',
    unit: '',
    notes: ''
  });

  const selectedProduct = products.find(p => p.id === formData.product_id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.product_id || !formData.supplier_id || !formData.price) {
      return;
    }

    try {
      await addPriceEntry.mutateAsync({
        product_id: formData.product_id,
        supplier_id: formData.supplier_id,
        price: parseFloat(formData.price),
        unit: formData.unit || selectedProduct?.unit || 'unit',
        notes: formData.notes || undefined,
      });
      
      setFormData({
        product_id: productId || '',
        supplier_id: supplierId || '',
        price: '',
        unit: '',
        notes: ''
      });
      
      if (onCancel) onCancel();
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-fill unit when product is selected
    if (field === 'product_id') {
      const product = products.find(p => p.id === value);
      if (product) {
        setFormData(prev => ({
          ...prev,
          unit: product.unit
        }));
      }
    }
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4">Add Price Entry</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="product">Product *</Label>
            <Select value={formData.product_id} onValueChange={(value) => handleChange('product_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} ({product.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="supplier">Supplier *</Label>
            <Select value={formData.supplier_id} onValueChange={(value) => handleChange('supplier_id', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name} {supplier.location && `(${supplier.location})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="price">Price (₦) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="0.00"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="unit">Unit</Label>
            <Input
              id="unit"
              value={formData.unit}
              onChange={(e) => handleChange('unit', e.target.value)}
              placeholder="kg, liter, bag, etc."
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Any additional notes about this price..."
            rows={3}
          />
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button 
            type="submit" 
            className="flex-1"
            disabled={addPriceEntry.isPending}
          >
            {addPriceEntry.isPending ? 'Adding...' : 'Add Price Entry'}
          </Button>
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel} 
              className="flex-1"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default PriceEntryForm;
