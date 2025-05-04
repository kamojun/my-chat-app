
export type Role = 'user' | 'assistant';

export interface MessageData {
  role: Role,
  content: string;
  image?: File; // UI用
  imageUrl?: string;
  isLoading?: boolean;
}