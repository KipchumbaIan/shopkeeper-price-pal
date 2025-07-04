
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  full_name: string | null;
  shop_name: string | null;
  location: string | null;
  created_at: string;
}

export const useUserAnalytics = () => {
  const { data: userProfiles, isLoading, error } = useQuery({
    queryKey: ['user-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as UserProfile[];
    },
  });

  const totalUsers = userProfiles?.length || 0;

  return {
    userProfiles: userProfiles || [],
    totalUsers,
    isLoading,
    error,
  };
};
