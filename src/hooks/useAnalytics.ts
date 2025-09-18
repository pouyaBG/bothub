import { analyticsService } from './../services/analyticsService';
import { useQuery } from '@tanstack/react-query';

// Query keys
export const ANALYTICS_QUERY_KEYS = {
  all: ['analytics'] as const,
  kpis: (timeRange: { startDate: Date; endDate: Date }) => [...ANALYTICS_QUERY_KEYS.all, 'kpis', timeRange] as const,
  newUsersTrend: (timeRange: { startDate: Date; endDate: Date }) => [...ANALYTICS_QUERY_KEYS.all, 'new-users-trend', timeRange] as const,
  activeUsers: (timeRange: { startDate: Date; endDate: Date }) => [...ANALYTICS_QUERY_KEYS.all, 'active-users', timeRange] as const,
  messageVolume: (timeRange: { startDate: Date; endDate: Date }) => [...ANALYTICS_QUERY_KEYS.all, 'message-volume', timeRange] as const,
  userDistribution: (timeRange: { startDate: Date; endDate: Date }) => [...ANALYTICS_QUERY_KEYS.all, 'user-distribution', timeRange] as const,
  funnelData: (timeRange: { startDate: Date; endDate: Date }) => [...ANALYTICS_QUERY_KEYS.all, 'funnel', timeRange] as const,
  popularCommands: (timeRange: { startDate: Date; endDate: Date }) => [...ANALYTICS_QUERY_KEYS.all, 'popular-commands', timeRange] as const,
  responseTypes: (timeRange: { startDate: Date; endDate: Date }) => [...ANALYTICS_QUERY_KEYS.all, 'response-types', timeRange] as const,
  goals: () => [...ANALYTICS_QUERY_KEYS.all, 'goals'] as const,
};

// Get KPIs
export const useAnalyticsKPIs = (timeRange: { startDate: Date; endDate: Date }) => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.kpis(timeRange),
    queryFn: () => analyticsService.getKPIs(timeRange),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Get new users trend
export const useNewUsersTrend = (timeRange: { startDate: Date; endDate: Date }) => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.newUsersTrend(timeRange),
    queryFn: () => analyticsService.getNewUsersTrend(timeRange),
    staleTime: 1000 * 60 * 5,
  });
};

// Get active users data
export const useActiveUsers = (timeRange: { startDate: Date; endDate: Date }) => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.activeUsers(timeRange),
    queryFn: () => analyticsService.getActiveUsers(timeRange),
    staleTime: 1000 * 60 * 5,
  });
};

// Get message volume
export const useMessageVolume = (timeRange: { startDate: Date; endDate: Date }) => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.messageVolume(timeRange),
    queryFn: () => analyticsService.getMessageVolume(timeRange),
    staleTime: 1000 * 60 * 5,
  });
};

// Get user distribution
export const useUserDistribution = (timeRange: { startDate: Date; endDate: Date }) => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.userDistribution(timeRange),
    queryFn: () => analyticsService.getUserDistribution(timeRange),
    staleTime: 1000 * 60 * 5,
  });
};

// Get funnel data
export const useFunnelData = (timeRange: { startDate: Date; endDate: Date }) => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.funnelData(timeRange),
    queryFn: () => analyticsService.getFunnelData(timeRange),
    staleTime: 1000 * 60 * 5,
  });
};

// Get popular commands
export const usePopularCommands = (timeRange: { startDate: Date; endDate: Date }) => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.popularCommands(timeRange),
    queryFn: () => analyticsService.getPopularCommands(timeRange),
    staleTime: 1000 * 60 * 5,
  });
};

// Get response types
export const useResponseTypes = (timeRange: { startDate: Date; endDate: Date }) => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.responseTypes(timeRange),
    queryFn: () => analyticsService.getResponseTypes(timeRange),
    staleTime: 1000 * 60 * 5,
  });
};

// Get goals
export const useGoals = () => {
  return useQuery({
    queryKey: ANALYTICS_QUERY_KEYS.goals(),
    queryFn: () => analyticsService.getGoals(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};