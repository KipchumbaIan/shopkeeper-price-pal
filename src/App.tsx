import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Products from '@/pages/Products';
import Suppliers from '@/pages/Suppliers';
import Trends from '@/pages/Trends';
import NotFound from '@/pages/NotFound';
import AuthForm from '@/components/AuthForm';
import { AuthProvider } from '@/hooks/useAuth';
import { Toaster } from '@/components/ui/toaster';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AdminSetupPage from '@/pages/AdminSetup';

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admin-setup" element={<AdminSetupPage />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
