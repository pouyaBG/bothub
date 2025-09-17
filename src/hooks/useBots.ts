import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { botsService, type CreateBotData, type UpdateBotData } from '../services/botsService';

// Query keys
export const BOTS_QUERY_KEYS = {
  all: ['bots'] as const,
  lists: () => [...BOTS_QUERY_KEYS.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...BOTS_QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...BOTS_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...BOTS_QUERY_KEYS.details(), id] as const,
};

// Get all bots
export const useBots = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: BOTS_QUERY_KEYS.list(filters || {}),
    queryFn: () => botsService.getBots(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get single bot
export const useBot = (id: number) => {
  return useQuery({
    queryKey: BOTS_QUERY_KEYS.detail(id),
    queryFn: () => botsService.getBot(id),
    enabled: !!id,
  });
};

// Create bot mutation
export const useCreateBot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBotData) => botsService.createBot(data),
    onSuccess: () => {
      // Invalidate and refetch bots list
      queryClient.invalidateQueries({ queryKey: BOTS_QUERY_KEYS.lists() });
    },
  });
};

// Update bot mutation
export const useUpdateBot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBotData) => botsService.updateBot(data),
    onSuccess: (updatedBot) => {
      // Update the bot in cache
      queryClient.setQueryData(
        BOTS_QUERY_KEYS.detail(updatedBot.id),
        updatedBot
      );
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: BOTS_QUERY_KEYS.lists() });
    },
  });
};

// Delete bot mutation
export const useDeleteBot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => botsService.deleteBot(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: BOTS_QUERY_KEYS.all });
    },
  });
};

// Toggle bot status mutation
export const useToggleBotStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'فعال' | 'غیرفعال' }) =>
      botsService.toggleBotStatus(id, status),
    onSuccess: (updatedBot) => {
      // Update bot in cache
      queryClient.setQueryData(
        BOTS_QUERY_KEYS.detail(updatedBot.id),
        updatedBot
      );
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: BOTS_QUERY_KEYS.lists() });
    },
  });
};