
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface LatestPrice {
  id: string;
  product_id: string;
  product_name: string;
  product_category: string;
  supplier_id: string;
  supplier_name: string;
  supplier_location?: string;
  price: number;
  unit: string;
  created_at: string;
  user_id: string;
  notes?: string;
}

export const useLatestPrices = () => {
  const { user } = useAuth();

  const {
    data: latestPrices = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['latest-prices', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('latest_prices')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as LatestPrice[];
    },
    enabled: !!user,
  });

  // Group by product to get stats
  const productStats = latestPrices.reduce((acc, price) => {
    const key = price.product_name;
    if (!acc[key]) {
      acc[key] = {
        name: price.product_name,
        category: price.product_category,
        unit: price.unit,
        prices: [],
        suppliers: new Set(),
      };
    }
    acc[key].prices.push(price.price);
    acc[key].suppliers.add(price.supplier_name);
    return acc;
  }, {} as Record<string, any>);

  const products = Object.values(productStats).map((product: any) => {
    const prices = product.prices.sort((a: number, b: number) => a - b);
    const lowestPrice = prices[0] || 0;
    const highestPrice = prices[prices.length - 1] || 0;
    const priceChange = prices.length > 1 ? 
      ((lowestPrice - prices[1]) / prices[1]) * 100 : 0;

    return {
      name: product.name,
      category: product.category,
      lowestPrice,
      suppliers: product.suppliers.size,
      priceChange,
      unit: product.unit,
    };
  });

  return {
    latestPrices,
    products,
    isLoading,
    error,
  };
};
