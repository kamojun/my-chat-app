
export type Role = 'user' | 'assistant';

export interface MessageData {
  role: Role,
  content: string;
  images?: File[]; // UI用
  imageUrls?: string[];
  isLoading?: boolean;
}