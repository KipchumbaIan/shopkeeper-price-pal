
# PricePal - Market Price Tracking Application

## Overview

PricePal is a comprehensive market price tracking application built for traders and business owners to monitor, compare, and analyze supplier prices across different products. The application provides real-time price tracking, supplier management, and trend analysis to help users make informed purchasing decisions.

## Key Features

- **Product Management**: Add, categorize, and manage products with detailed information
- **Supplier Network**: Maintain a database of suppliers with contact information and ratings  
- **Price Tracking**: Record and track price entries from different suppliers over time
- **Price Comparison**: Compare prices across suppliers for the same products
- **Trend Analysis**: Visualize price trends and market movements with interactive charts
- **Real-time Updates**: Live data refreshing every 30 seconds for latest market prices
- **User Authentication**: Secure user accounts with data isolation
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with full TypeScript support
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing for single-page application
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Shadcn/ui**: Beautiful, accessible UI components
- **Recharts**: Interactive charts and data visualization
- **Lucide React**: Beautiful icon library

### Backend & Database
- **Supabase**: Backend-as-a-Service providing:
  - PostgreSQL database with Row Level Security (RLS)
  - Real-time subscriptions
  - Authentication and user management
  - Edge functions for server-side logic

### State Management & Data Fetching
- **TanStack React Query**: Powerful data fetching and caching
- **Custom React Hooks**: Encapsulated business logic
- **Zustand** (via hooks): Lightweight state management

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/ui base components
│   ├── AuthForm.tsx     # Authentication form
│   ├── Header.tsx       # Navigation header
│   ├── AddProductForm.tsx
│   ├── PriceEntryForm.tsx
│   └── PriceComparisonTable.tsx
├── pages/               # Main application pages
│   ├── Dashboard.tsx    # Overview and statistics
│   ├── Products.tsx     # Product management
│   ├── Suppliers.tsx    # Supplier management
│   ├── Trends.tsx       # Price trend analysis
│   └── NotFound.tsx     # 404 error page
├── hooks/               # Custom React hooks
│   ├── useAuth.tsx      # Authentication logic
│   ├── useProducts.tsx  # Product CRUD operations
│   ├── useSuppliers.tsx # Supplier CRUD operations
│   ├── usePriceEntries.tsx
│   └── useLatestPrices.tsx
├── integrations/        # External service integrations
│   └── supabase/        # Supabase configuration
└── lib/                 # Utility functions
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for backend services)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pricepal
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new Supabase project
   - Run the database migrations (see Database Setup)
   - Update the Supabase configuration in `src/integrations/supabase/client.ts`

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Database Setup

The application uses Supabase PostgreSQL with the following tables:

- `profiles`: User profile information
- `products`: Product catalog
- `suppliers`: Supplier directory  
- `price_entries`: Individual price records
- `latest_prices`: View of most recent prices per product/supplier

See `docs/DATABASE.md` for detailed schema documentation.

## Usage Guide

### Getting Started
1. **Sign Up/Login**: Create an account or login with existing credentials
2. **Add Products**: Navigate to Products page and add items you want to track
3. **Add Suppliers**: Go to Suppliers page and add your supplier network
4. **Record Prices**: Use "Add Price Entry" buttons to log current market prices
5. **Analyze Trends**: Visit Trends page to view price movements and comparisons

### Key Workflows
- **Price Comparison**: Dashboard shows side-by-side price comparisons
- **Trend Analysis**: Trends page provides historical price charts
- **Supplier Management**: Rate and organize your supplier network
- **Real-time Updates**: Data refreshes automatically for latest information

## API Documentation

See `docs/API.md` for detailed information about the custom hooks and data fetching patterns.

## Component Documentation

See `docs/COMPONENTS.md` for detailed component documentation and usage examples.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.
