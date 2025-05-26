
# Component Documentation

## Overview

PricePal uses a component-based architecture with reusable UI components built on Shadcn/ui and custom business logic components. All components are built with TypeScript for type safety and accessibility.

## Page Components

### Dashboard.tsx

Main landing page showing price overview and statistics.

**Features:**
- Real-time price updates
- Product statistics cards
- Recent price entries table
- Quick action buttons
- Responsive grid layout

**Key Sections:**
- Welcome header with user stats
- Price comparison table
- Recent activity feed
- Quick add buttons for products/suppliers

**Data Dependencies:**
- `useLatestPrices()` for current market data
- `useProducts()` for product statistics
- `useSuppliers()` for supplier counts
- `usePriceEntries()` for recent activity

### Products.tsx

Product catalog management interface.

**Props:** None (page component)

**Features:**
- Product grid display
- Add/edit/delete operations
- Category filtering
- Price entry integration

**State Management:**
```typescript
const [showAddForm, setShowAddForm] = useState(false);
const [showPriceForm, setShowPriceForm] = useState(false);
const [selectedProductId, setSelectedProductId] = useState<string>('');
```

**Key Methods:**
- `handleAddProduct()`: Creates new product
- `handleDeleteProduct()`: Removes product with confirmation
- `handleAddPriceEntry()`: Links to price entry form

### Suppliers.tsx

Supplier directory management interface.

**Features:**
- Supplier cards with contact info
- Rating system display
- Location mapping
- Direct price entry access

**Form Handling:**
```typescript
const [formData, setFormData] = useState({
  name: '',
  contact: '', 
  location: '',
  email: ''
});
```

### Trends.tsx

Price trend analysis and visualization.

**Features:**
- Interactive line charts
- Supplier comparison bar charts
- Filter controls (product, time period, supplier)
- Real-time data updates

**Chart Configuration:**
- Uses Recharts library
- Responsive container design
- Color-coded product lines
- Tooltip customization

**Filter State:**
```typescript
const [selectedProduct, setSelectedProduct] = useState('all');
const [selectedSupplier, setSelectedSupplier] = useState('all');
```

## Form Components

### AddProductForm.tsx

Product creation form with validation.

**Props:**
```typescript
interface AddProductFormProps {
  onSubmit: (productData: ProductFormData) => void;
  onCancel: () => void;
}
```

**Form Fields:**
- Product name (required)
- Category selection
- Unit of measurement
- Description (optional)

**Validation:**
- Required field validation
- Input sanitization
- Category standardization

### PriceEntryForm.tsx

Price recording form with dynamic product/supplier selection.

**Props:**
```typescript
interface PriceEntryFormProps {
  productId?: string;
  supplierId?: string;
  onCancel: () => void;
}
```

**Features:**
- Dynamic product/supplier dropdowns
- Price input with currency formatting
- Unit validation
- Notes field for additional context

**Form State:**
```typescript
const [formData, setFormData] = useState({
  product_id: productId || '',
  supplier_id: supplierId || '',
  price: '',
  unit: '',
  notes: ''
});
```

## UI Components

### Header.tsx

Application navigation and user controls.

**Features:**
- Logo and branding
- Main navigation menu
- User profile dropdown
- Sign out functionality
- Mobile responsive hamburger menu

**Navigation Items:**
```typescript
const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Suppliers', path: '/suppliers' },
  { name: 'Trends', path: '/trends' }
];
```

### AuthForm.tsx

Authentication interface for login/signup.

**Features:**
- Toggle between login and signup modes
- Form validation
- Loading states
- Error messaging
- Social login integration (if configured)

**Props:** None (handles own state)

### PriceComparisonTable.tsx

Tabular price comparison display.

**Props:**
```typescript
interface PriceComparisonTableProps {
  prices: LatestPrice[];
  isLoading?: boolean;
}
```

**Features:**
- Sortable columns
- Price highlighting (lowest/highest)
- Supplier information display
- Mobile responsive design

**Table Columns:**
- Product name and category
- Supplier name and location
- Current price with unit
- Last updated timestamp
- Action buttons

### ProductCard.tsx

Individual product display card.

**Props:**
```typescript
interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onAddPrice: (productId: string) => void;
}
```

**Features:**
- Product image placeholder
- Category and unit display
- Action button toolbar
- Price history preview

## Shadcn/ui Components

The application uses Shadcn/ui components for consistent design:

### Commonly Used Components

- `Button`: Primary actions and navigation
- `Card`: Content containers and layouts
- `Input`: Form inputs with validation
- `Select`: Dropdown selections
- `Table`: Data display tables
- `Dialog`: Modal dialogs
- `Toast`: Notification system

### Component Customization

```typescript
// Example custom button variant
<Button 
  variant="outline" 
  size="sm"
  className="custom-class"
  onClick={handleClick}
>
  Action Text
</Button>
```

### Form Integration

```typescript
// Form field with validation
<div className="space-y-2">
  <Label htmlFor="name">Product Name</Label>
  <Input
    id="name"
    name="name"
    value={formData.name}
    onChange={handleChange}
    placeholder="Enter product name"
    required
  />
</div>
```

## Chart Components

### Price Trend Charts

Built with Recharts for interactive data visualization.

**Line Chart Configuration:**
```typescript
<LineChart data={trendData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
  <Legend />
  {products.map((product, index) => (
    <Line 
      key={product}
      type="monotone" 
      dataKey={product} 
      stroke={colors[index]} 
      strokeWidth={2}
    />
  ))}
</LineChart>
```

**Bar Chart for Comparisons:**
```typescript
<BarChart data={supplierComparison}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="supplier" />
  <YAxis />
  <Tooltip />
  <Legend />
  {products.map((product, index) => (
    <Bar 
      key={product}
      dataKey={product} 
      fill={colors[index]}
    />
  ))}
</BarChart>
```

## Responsive Design

### Breakpoint Strategy

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

### Grid Layouts

```typescript
// Responsive product grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>
```

### Mobile Optimizations

- Collapsible navigation
- Touch-friendly buttons
- Responsive tables
- Optimized form layouts

## Error Handling

### Error Boundaries

```typescript
// Global error boundary for component errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### Loading States

```typescript
// Consistent loading pattern
if (isLoading) {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      <p className="ml-4">Loading...</p>
    </div>
  );
}
```

### Empty States

```typescript
// Graceful empty state handling
if (products.length === 0) {
  return (
    <Card className="p-8 text-center">
      <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold mb-2">No products yet</h3>
      <p className="text-gray-600 mb-4">Start by adding your first product</p>
      <Button onClick={() => setShowAddForm(true)}>
        Add Product
      </Button>
    </Card>
  );
}
```

## Performance Optimization

### Memoization

```typescript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return products.reduce((acc, product) => {
    // Complex calculation
    return acc + product.price;
  }, 0);
}, [products]);
```

### Component Lazy Loading

```typescript
// Lazy load heavy components
const TrendsPage = lazy(() => import('./pages/Trends'));

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <TrendsPage />
</Suspense>
```

### Virtualization

For large lists, consider implementing virtualization:

```typescript
// Virtual scrolling for large datasets
import { FixedSizeList as List } from 'react-window';

const VirtualizedProductList = ({ products }) => (
  <List
    height={600}
    itemCount={products.length}
    itemSize={120}
  >
    {({ index, style }) => (
      <div style={style}>
        <ProductCard product={products[index]} />
      </div>
    )}
  </List>
);
```

## Testing

### Component Testing

```typescript
// Example component test
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';

test('renders product information', () => {
  const mockProduct = {
    id: '1',
    name: 'Rice',
    category: 'Grains',
    unit: 'bag'
  };

  render(<ProductCard product={mockProduct} />);
  
  expect(screen.getByText('Rice')).toBeInTheDocument();
  expect(screen.getByText('Grains')).toBeInTheDocument();
});
```

### Integration Testing

```typescript
// Test component integration with hooks
test('adds new product successfully', async () => {
  const { getByText, getByLabelText } = render(<ProductsPage />);
  
  fireEvent.click(getByText('Add New Product'));
  fireEvent.change(getByLabelText('Product Name'), { target: { value: 'Rice' } });
  fireEvent.click(getByText('Add Product'));
  
  await waitFor(() => {
    expect(getByText('Rice')).toBeInTheDocument();
  });
});
```

## Accessibility

### ARIA Labels

```typescript
<Button 
  aria-label="Delete product"
  onClick={() => handleDelete(product.id)}
>
  <Trash2 className="h-4 w-4" />
</Button>
```

### Keyboard Navigation

All interactive elements support keyboard navigation with proper focus management.

### Screen Reader Support

Semantic HTML and ARIA attributes ensure compatibility with screen readers.
