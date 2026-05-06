import { useQuery } from '@tanstack/react-query';

export function usePortfolio() {
  return useQuery({
    queryKey: ['treasury-portfolio'],
    queryFn: async () => {
      const res = await fetch('/api/treasury/portfolio');
      if (!res.ok) throw new Error('Failed to fetch portfolio');
      return res.json();
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}
