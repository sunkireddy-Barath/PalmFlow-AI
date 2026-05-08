import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function usePolicies() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['policies'],
    queryFn: async () => {
      const res = await fetch('/api/policies');
      if (!res.ok) throw new Error('Failed to fetch policies');
      return res.json();
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/policies/${id}/toggle`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to toggle policy');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['policies'] });
    },
  });

  return {
    ...query,
    togglePolicy: toggleMutation.mutate,
    isToggling: toggleMutation.isPending,
  };
}
