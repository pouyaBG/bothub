import { api } from './api';

export interface Bot {
  id: number;
  name: string;
  username: string;
  status: 'فعال' | 'غیرفعال';
  users: string;
  lastActivity: string;
  type: string;
  token?: string;
}

export interface CreateBotData {
  name: string;
  token: string;
  type: string;
}

export interface UpdateBotData extends Partial<CreateBotData> {
  id: number;
}

// Bots API endpoints
export const botsService = {
  // Get all bots
  getBots: () => api.get<Bot[]>('/bots'),

  // Get single bot
  getBot: (id: number) => api.get<Bot>(`/bots/${id}`),

  // Create new bot
  createBot: (data: CreateBotData) => api.post<Bot>('/bots', data),

  // Update bot
  updateBot: (data: UpdateBotData) => api.put<Bot>(`/bots/${data.id}`, data),

  // Delete bot
  deleteBot: (id: number) => api.delete(`/bots/${id}`),

  // Start/Stop bot
  toggleBotStatus: (id: number, status: 'فعال' | 'غیرفعال') =>
    api.put<Bot>(`/bots/${id}/status`, { status }),
};