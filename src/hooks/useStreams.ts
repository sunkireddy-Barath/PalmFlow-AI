import { useQuery } from '@tanstack/react-query';

export function useStreams() {
  return useQuery({
    queryKey: ['streams'],
    queryFn: async () => {
      const res = await fetch('/api/streams');
      if (!res.ok) throw new Error('Failed to fetch streams');
      return res.json();
    },
    refetchInterval: 2000, // Frequent refresh for "streaming" visual effect
  });
}
