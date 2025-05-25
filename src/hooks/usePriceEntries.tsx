
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface PriceEntry {
  id: string;
  product_id: string;
  supplier_id: string;
  price: number;
  unit: string;
  notes?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface PriceEntryWithDetails extends PriceEntry {
  products: {
    name: string;
    category: string;
  };
  suppliers: {
    name: string;
    location?: string;
  };
}

export const usePriceEntries = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: priceEntries = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['price-entries', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('price_entries')
        .select(`
          *,
          products (name, category),
          suppliers (name, location)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as PriceEntryWithDetails[];
    },
    enabled: !!user,
  });

  const addPriceEntry = useMutation({
    mutationFn: async (priceEntry: Omit<PriceEntry, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('price_entries')
        .insert([{ ...priceEntry, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['price-entries'] });
      queryClient.invalidateQueries({ queryKey: ['latest-prices'] });
      toast({
        title: "Price entry added",
        description: "Price entry has been added successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deletePriceEntry = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('price_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['price-entries'] });
      queryClient.invalidateQueries({ queryKey: ['latest-prices'] });
      toast({
        title: "Price entry deleted",
        description: "Price entry has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    priceEntries,
    isLoading,
    error,
    addPriceEntry,
    deletePriceEntry,
  };
};
