// shared/types.ts

export type Role = 'user' | 'assistant';

export interface ChatMessage {
  role: Role;
  content: string;
  imageUrl?: string;
}
