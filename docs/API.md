
# API & Hooks Documentation

## Overview

PricePal uses custom React hooks built on top of TanStack React Query for data fetching and state management. All API calls are made through Supabase's JavaScript client with automatic caching and real-time updates.

## Authentication Hooks

### useAuth()

Central authentication hook managing user state and authentication methods.

```typescript
const { user, loading, signIn, signUp, signOut } = useAuth();
```

**Returns:**
- `user`: Current authenticated user object or null
- `loading`: Boolean indicating auth state loading
- `signIn(email, password)`: Sign in method
- `signUp(email, password, userData)`: Sign up method  
- `signOut()`: Sign out method

**Features:**
- Automatic session management
- Persistent login state
- Real-time auth state updates
- Error handling for auth failures

## Product Management Hooks

### useProducts()

Manages product CRUD operations with caching and optimistic updates.

```typescript
const { 
  products, 
  isLoading, 
  error, 
  addProduct, 
  deleteProduct 
} = useProducts();
```

**Returns:**
- `products`: Array of user's products
- `isLoading`: Loading state for initial fetch
- `error`: Error object if fetch fails
- `addProduct`: Mutation for creating products
- `deleteProduct`: Mutation for removing products

**Product Interface:**
```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  description?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}
```

**Usage Example:**
```typescript
const handleAddProduct = async (productData) => {
  try {
    await addProduct.mutateAsync({
      name: "Rice",
      category: "Grains", 
      unit: "bag",
      description: "Long grain rice"
    });
  } catch (error) {
    console.error("Failed to add product:", error);
  }
};
```

## Supplier Management Hooks

### useSuppliers()

Handles supplier directory management with full CRUD operations.

```typescript
const { 
  suppliers, 
  isLoading, 
  error, 
  addSupplier, 
  deleteSupplier 
} = useSuppliers();
```

**Supplier Interface:**
```typescript
interface Supplier {
  id: string;
  name: string;
  contact?: string;
  location?: string;
  email?: string;
  rating?: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}
```

**Features:**
- Contact information management
- Location tracking
- Supplier rating system
- Search and filtering capabilities

## Price Tracking Hooks

### usePriceEntries()

Manages individual price entries with detailed supplier and product information.

```typescript
const { 
  priceEntries, 
  isLoading, 
  error, 
  addPriceEntry, 
  deletePriceEntry 
} = usePriceEntries();
```

**Price Entry Interface:**
```typescript
interface PriceEntryWithDetails {
  id: string;
  product_id: string;
  supplier_id: string;
  price: number;
  unit: string;
  notes?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  products: {
    name: string;
    category: string;
  };
  suppliers: {
    name: string;
    location?: string;
  };
}
```

**Features:**
- Joins with product and supplier data
- Chronological ordering
- Notes and metadata support
- Automatic cache invalidation

### useLatestPrices()

Optimized hook for real-time price monitoring and trend analysis.

```typescript
const { 
  latestPrices, 
  products, 
  isLoading, 
  error, 
  refetch 
} = useLatestPrices();
```

**Returns:**
- `latestPrices`: Most recent prices per product/supplier combination
- `products`: Aggregated product statistics with price analysis
- `isLoading`: Loading state
- `error`: Error state
- `refetch`: Manual refresh function

**Product Statistics:**
```typescript
interface ProductStats {
  name: string;
  category: string;
  lowestPrice: number;
  suppliers: number;
  priceChange: number;
  unit: string;
}
```

**Features:**
- 30-second auto-refresh for real-time data
- Price change calculations
- Supplier count aggregation
- Market trend analysis

## Data Fetching Patterns

### Query Configuration

All hooks use consistent React Query configuration:

```typescript
const queryConfig = {
  queryKey: ['resource-name', user?.id],
  queryFn: async () => {
    // Supabase query logic
  },
  enabled: !!user, // Only fetch when authenticated
  refetchInterval: 30000, // Real-time updates
  retry: 1,
  refetchOnWindowFocus: false
};
```

### Error Handling

Centralized error handling with toast notifications:

```typescript
const addMutation = useMutation({
  mutationFn: async (data) => {
    // API call
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['resource']);
    toast({ title: "Success message" });
  },
  onError: (error) => {
    toast({ 
      title: "Error", 
      description: error.message,
      variant: "destructive" 
    });
  }
});
```

### Cache Management

Strategic cache invalidation ensures data consistency:

```typescript
// Invalidate related queries after mutations
onSuccess: () => {
  queryClient.invalidateQueries(['price-entries']);
  queryClient.invalidateQueries(['latest-prices']);
  queryClient.invalidateQueries(['products']);
}
```

## Real-time Features

### Auto-refresh

Latest prices refresh every 30 seconds:

```typescript
refetchInterval: 30000
```

### Manual Refresh

All hooks provide manual refresh capabilities:

```typescript
const { refetch } = useLatestPrices();

// Trigger manual refresh
await refetch();
```

### Optimistic Updates

Immediate UI updates before server confirmation:

```typescript
const addProduct = useMutation({
  mutationFn: addProductApi,
  onMutate: async (newProduct) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['products']);
    
    // Snapshot previous value
    const previousProducts = queryClient.getQueryData(['products']);
    
    // Optimistically update
    queryClient.setQueryData(['products'], old => [...old, newProduct]);
    
    return { previousProducts };
  },
  onError: (err, newProduct, context) => {
    // Rollback on error
    queryClient.setQueryData(['products'], context.previousProducts);
  }
});
```

## Performance Optimization

### Selective Refetching

```typescript
// Only refetch when specific conditions are met
enabled: !!user && shouldFetchData
```

### Background Updates

```typescript
// Update data in background without loading states
refetchOnWindowFocus: false,
refetchOnMount: false
```

### Request Deduplication

React Query automatically deduplicates identical requests within a short time window.

## Error States

Common error scenarios and handling:

1. **Network Errors**: Automatic retry with exponential backoff
2. **Authentication Errors**: Redirect to login
3. **Permission Errors**: Display appropriate error messages
4. **Validation Errors**: Form-level error display

## Testing

Mock hooks for testing:

```typescript
// Test utilities
export const mockUseProducts = () => ({
  products: mockProducts,
  isLoading: false,
  error: null,
  addProduct: { mutateAsync: jest.fn() },
  deleteProduct: { mutateAsync: jest.fn() }
});
```

## Migration Guide

When updating hook interfaces:

1. Update TypeScript interfaces
2. Add backward compatibility if needed
3. Update dependent components
4. Test data flow thoroughly
5. Update documentation
