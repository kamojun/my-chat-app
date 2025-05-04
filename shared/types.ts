// shared/types.ts

export type Role = 'user' | 'assistant';

export interface ChatMessage {
  role: Role;
  content: string;
  imageUrl?: string;
}

export interface ChatResponse {
  role: 'assistant';
  content: string;
  imageUrl?: string;
}
