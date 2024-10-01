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

export interface FileUploaded extends ServerResponse {
  data: {
    id: string;
    name: string;
    size: number;
    created_at: string;
    type?: string;
  };
}

export type SendMessagePayload = {
  content: (TextNode | ImageNode)[];
  attachments: string[];
};
type TextNode = {
  type: 'text';
  text: string;
};
export type ImageNode = {
  image_file: {
    file_id: string;
  };
  type: 'image_file';
};

// TODO: add type for file response
export type MessageSliced = {
  value: string;
  annotations: null | unknown[];
};
export type MessageFull = {
  id: string;
  role: string;
  status: 'completed';
  content: [
    {
      text: {
        value: string;
        annotations: unknown[];
      };
      type: 'text';
    },
  ];
  created_at: number;
  attachments: { file_id: string }[];
};

export type MessageStream = {
  event: 'text_delta' | 'message_done';
  data: MessageFull | MessageSliced;
};
export type MessageListItem = MessageFull | ActiveUserMessage;

export type OnChunkMessage = (value: MessageStream) => void;

export type ActiveUserMessage = {
  id: string;
  text: string;
  role: 'active_user_message';
  created_at: number;
  files_count?: number;
};
export type ActiveMessage = {
  text: string;
  role: 'active_message';
  is_request_load: boolean;
};
export const ActiveMessageInitial: ActiveMessage = {
  text: '',
  role: 'active_message',
  is_request_load: false,
};

export interface MessagesList extends ServerResponse {
  data: MessageFull[];
}
