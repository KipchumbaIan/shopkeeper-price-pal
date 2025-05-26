
# Database Schema Documentation

## Overview

PricePal uses Supabase PostgreSQL as its database with Row Level Security (RLS) enabled for data isolation between users. The schema is designed for efficient price tracking and supplier management.

## Tables

### profiles
User profile information extending Supabase auth.users.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  full_name TEXT,
  shop_name TEXT,
  phone TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Columns:**
- `id`: User ID (references auth.users)
- `full_name`: User's display name
- `shop_name`: Business/shop name (optional)
- `phone`: Contact phone number
- `location`: Business location
- `created_at`, `updated_at`: Timestamps

**RLS Policies:** Users can only access their own profile data.

### products
Product catalog with categories and units.

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Columns:**
- `id`: Unique product identifier
- `user_id`: Owner of the product record
- `name`: Product name (e.g., "Rice", "Tomatoes")
- `category`: Product category (e.g., "Grains", "Vegetables")
- `unit`: Measurement unit (e.g., "kg", "bag", "carton")
- `description`: Optional product description
- `created_at`, `updated_at`: Timestamps

**RLS Policies:** Users can only access their own products.

### suppliers
Supplier directory with contact information.

```sql
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users,
  name TEXT NOT NULL,
  contact TEXT,
  email TEXT,
  location TEXT,
  rating NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Columns:**
- `id`: Unique supplier identifier
- `user_id`: Owner of the supplier record
- `name`: Supplier name/business name
- `contact`: Phone number or contact method
- `email`: Email address (optional)
- `location`: Supplier location/market
- `rating`: Supplier rating (0-5 scale)
- `created_at`, `updated_at`: Timestamps

**RLS Policies:** Users can only access their own suppliers.

### price_entries
Individual price records linking products and suppliers.

```sql
CREATE TABLE price_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users,
  product_id UUID NOT NULL REFERENCES products(id),
  supplier_id UUID NOT NULL REFERENCES suppliers(id),
  price NUMERIC NOT NULL,
  unit TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Columns:**
- `id`: Unique price entry identifier
- `user_id`: Owner of the price record
- `product_id`: Reference to products table
- `supplier_id`: Reference to suppliers table
- `price`: Price value in local currency
- `unit`: Unit of measurement for this price
- `notes`: Optional notes about the price/conditions
- `created_at`, `updated_at`: Timestamps

**RLS Policies:** Users can only access their own price entries.

**Indexes:**
- `product_id, supplier_id, created_at` for efficient price lookups
- `user_id, created_at` for user-specific queries

## Views

### latest_prices
Materialized view showing the most recent price for each product-supplier combination.

```sql
CREATE VIEW latest_prices AS
SELECT DISTINCT ON (pe.product_id, pe.supplier_id)
  pe.id,
  pe.product_id,
  p.name as product_name,
  p.category as product_category,
  pe.supplier_id,
  s.name as supplier_name,
  s.location as supplier_location,
  pe.price,
  pe.unit,
  pe.notes,
  pe.user_id,
  pe.created_at
FROM price_entries pe
JOIN products p ON pe.product_id = p.id
JOIN suppliers s ON pe.supplier_id = s.id
ORDER BY pe.product_id, pe.supplier_id, pe.created_at DESC;
```

This view is used extensively in the frontend for:
- Dashboard price comparisons
- Real-time price updates
- Trend analysis calculations

## Database Functions

### handle_new_user()
Trigger function that automatically creates a profile record when a new user signs up.

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Row Level Security (RLS)

All tables have RLS enabled with policies ensuring users can only access their own data:

```sql
-- Example policy for products table
CREATE POLICY "Users can view own products" ON products
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own products" ON products
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own products" ON products
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own products" ON products
  FOR DELETE USING (auth.uid() = user_id);
```

## Data Relationships

```
auth.users (Supabase managed)
    ↓
profiles (1:1)
    ↓
products (1:many)
    ↓
price_entries (many:1) ← suppliers (1:many)
                           ↑
                       profiles (1:many)
```

## Performance Considerations

1. **Indexes**: Strategic indexes on frequently queried columns
2. **Views**: latest_prices view reduces complex joins in frontend
3. **RLS**: Policies use efficient user_id comparisons
4. **Timestamps**: Enable efficient time-based queries for trends

## Backup and Maintenance

- Supabase provides automated backups
- Use `pg_dump` for additional backups if needed
- Monitor query performance with Supabase dashboard
- Regular cleanup of old price_entries if needed (implement retention policy)

## Migration History

1. **Initial Schema**: Basic tables and RLS policies
2. **Price Tracking**: Added price_entries and latest_prices view
3. **User Profiles**: Enhanced profiles table with business information
4. **Performance**: Added indexes and optimized queries

For migration scripts, see the `supabase/migrations/` directory.
