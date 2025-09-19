export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  status: UserStatus;
  planType: PlanType;
  avatarUrl?: string;
  joinDate: string;
  lastLogin?: string;
  isOnline: boolean;
  phoneNumber?: string;
  permissions: Permission[];
}

export interface UserRole {
  id: number;
  name: string;
  displayName: string;
  level: number;
  color: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
  displayName: string;
  category: string;
  description: string;
}

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';
export type PlanType = 'free' | 'basic' | 'premium' | 'enterprise';

export interface UserFilters {
  role?: string;
  status?: UserStatus;
  planType?: PlanType;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface UserActivity {
  id: number;
  userId: number;
  action: string;
  description: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
}