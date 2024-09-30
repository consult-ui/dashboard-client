import { baseQueryWithReauth } from '@/app/api/constants';
import { ServerResponse } from '@/app/api/types';
import {
  Assistants,
  Chats,
  FileUploaded,
  MessageStream,
  OnChunkMessage,
  SendMessagePayload,
} from '@/app/api/types/chat.ts';
import { createApi } from '@reduxjs/toolkit/query/react';

const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    chatList: builder.query<Chats, void>({
      query: () => '/chat/list',
    }),
    assistantList: builder.query<Assistants, void>({
      query: () => '/chat/assistant/list',
    }),
    chatCreate: builder.mutation<ServerResponse, { assistant_id: number }>({
      query: (body: { assistant_id: number }) => ({
        url: '/chat/create',
        method: 'POST',
        body,
      }),
    }),
    chatDelete: builder.mutation<ServerResponse, { chat_id: number }>({
      query: (body: { chat_id: number }) => ({
        url: `/chat/${body.chat_id}/delete`,
        method: 'POST',
      }),
    }),
    chatUpdate: builder.mutation<ServerResponse, { chat_id: number; name: string; color: null | string }>({
      query: (body: { chat_id: number; name: string; color: null | string }) => ({
        url: `/chat/${body.chat_id}/update`,
        method: 'POST',
        body: { name: body.name, color: body.color },
      }),
    }),
    uploadFile: builder.mutation<FileUploaded, { chat_id: number; file: File }>({
      query: (body: { chat_id: number; file: File }) => {
        const formData = new FormData();
        formData.append('upload', body.file);

        return {
          url: `/chat/${body.chat_id}/upload-file`,
          method: 'POST',
          body: formData,
        };
      },
    }),
    deleteFile: builder.mutation<ServerResponse, { chat_id: number; file_id: string }>({
      query: (body: { chat_id: number; file_id: string }) => ({
        url: `/chat/${body.chat_id}/delete-file`,
        method: 'POST',
        body: { file_id: body.file_id },
      }),
    }),
    sendMessage: builder.mutation<void, { chat_id: number; body: SendMessagePayload; onChunk: OnChunkMessage }>({
      query: (body: { chat_id: number; body: SendMessagePayload; onChunk: OnChunkMessage }) => ({
        url: `/chat/${body.chat_id}/send`,
        method: 'POST',
        body: body.body,
        responseHandler: async (res) => {
          const reader = res.body?.getReader();
          let done, value;
          while (!done) {
            ({ value, done } = await (reader as ReadableStreamDefaultReader).read());
            const decodedValue = new TextDecoder().decode(value);
            const lines = decodedValue.split('\n');
            const result = {};

            lines.forEach((line) => {
              const [key, ...rest] = line.split(': ');
              const value = rest.join(': ').trim(); // Соединяем обратно, если есть дополнительные двоеточия в значении
              if (!key || !value) return; // Проверка, что ключ и значение существуют
              try {
                // @ts-expect-error - enable adding new keys to object
                result[key] = value.startsWith('{') ? JSON.parse(value) : value;
              } catch (error) {
                console.error(`Ошибка при парсинге значения для ключа "${key}":`, error);
              }
            });

            body.onChunk(result as MessageStream);
          }
        },
      }),
    }),
  }),
});

export default chatApi;
