# React Query Setup Guide

## Overview
React Query (TanStack Query) has been installed and configured in this project for efficient data fetching, caching, and synchronization.

## Installation
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

## Configuration
The QueryClient is configured in `src/App.tsx` with the following default settings:
- **Stale Time**: 5 minutes
- **Retry**: 1 attempt
- **Refetch on Window Focus**: Disabled

## File Structure
```
src/
├── hooks/
│   ├── useBots.ts          # Bot-related React Query hooks
│   └── useQueryClient.ts   # Query client utilities
├── services/
│   ├── api.ts              # Base API configuration
│   ├── botsService.ts      # Bot API service functions
│   └── README.md           # This file
└── components/
    └── common/
        └── LoadingSpinner.tsx # Loading component
```

## Usage Examples

### 1. Basic Query Hook
```typescript
import { useBots } from '../hooks/useBots';

const MyComponent = () => {
  const { data, isLoading, error } = useBots();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data?.map(bot => bot.name)}</div>;
};
```

### 2. Mutation Hook
```typescript
import { useCreateBot } from '../hooks/useBots';

const AddBotForm = () => {
  const createBot = useCreateBot();

  const handleSubmit = async (data) => {
    try {
      await createBot.mutateAsync(data);
      // Success handling
    } catch (error) {
      // Error handling
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={createBot.isPending}>
        {createBot.isPending ? 'در حال ایجاد...' : 'ایجاد بات'}
      </button>
    </form>
  );
};
```

### 3. Query Invalidation
```typescript
import { useQueryClient } from '@tanstack/react-query';
import { BOTS_QUERY_KEYS } from '../hooks/useBots';

const MyComponent = () => {
  const queryClient = useQueryClient();

  const refreshBots = () => {
    queryClient.invalidateQueries({
      queryKey: BOTS_QUERY_KEYS.lists()
    });
  };

  return <button onClick={refreshBots}>Refresh</button>;
};
```

## Query Keys Pattern
Query keys follow a hierarchical structure:
```typescript
const BOTS_QUERY_KEYS = {
  all: ['bots'],
  lists: () => [...BOTS_QUERY_KEYS.all, 'list'],
  list: (filters) => [...BOTS_QUERY_KEYS.lists(), { filters }],
  details: () => [...BOTS_QUERY_KEYS.all, 'detail'],
  detail: (id) => [...BOTS_QUERY_KEYS.details(), id],
};
```

## API Service Pattern
API services are organized by resource:
```typescript
export const botsService = {
  getBots: () => api.get<Bot[]>('/bots'),
  getBot: (id: number) => api.get<Bot>(`/bots/${id}`),
  createBot: (data: CreateBotData) => api.post<Bot>('/bots', data),
  updateBot: (data: UpdateBotData) => api.put<Bot>(`/bots/${data.id}`, data),
  deleteBot: (id: number) => api.delete(`/bots/${id}`),
};
```

## Development Tools
React Query DevTools are available in development mode. Access them via the floating button in the bottom-left corner of the screen.

## Best Practices
1. Use Query Keys consistently
2. Implement proper error handling
3. Show loading states
4. Invalidate queries after mutations
5. Use optimistic updates when appropriate
6. Implement proper TypeScript types

## Next Steps
To extend this setup for other resources:
1. Create service file in `src/services/`
2. Create corresponding hooks in `src/hooks/`
3. Follow the same patterns established for bots

## Example Usage
See `src/pages/Bots/BotsListWithQuery.tsx` for a complete implementation example.