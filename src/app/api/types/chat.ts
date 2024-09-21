import { ServerResponse } from '@/app/api/types/index.ts';

export interface Chats extends ServerResponse {
  data: ChatItem[];
}

export type ChatItem = {
  color: null | string;
  created_at: string;
  desc: string;
  icon_url: null | string;
  id: number;
  name: string;
};

export interface Assistants extends ServerResponse {
  data: AssistantItem[];
}

export type AssistantItem = Omit<ChatItem, 'created_at'>;
