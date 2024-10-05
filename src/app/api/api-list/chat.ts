import { baseQueryWithReauth } from '@/app/api/constants';
import { ServerResponse } from '@/app/api/types';
import {
  Assistants,
  Chats,
  FileUploaded,
  MessagesList,
  MessageStream,
  OnChunkMessage,
  QuestionsList,
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
    messagesList: builder.query<MessagesList, { chat_id: number }>({
      query: (query) => `/chat/${query.chat_id}/messages`,
    }),
    questionsList: builder.query<QuestionsList, { chat_id: number }>({
      query: (query) => `/chat/${query.chat_id}/questions`,
    }),
    sendMessage: builder.mutation<void, { chat_id: number; body: SendMessagePayload; onChunk: OnChunkMessage }>({
      query: (body: { chat_id: number; body: SendMessagePayload; onChunk: OnChunkMessage }) => ({
        url: `/chat/${body.chat_id}/send`,
        method: 'POST',
        body: body.body,
        responseHandler: async (res) => {
          const reader = res.body?.getReader();
          let done = false;
          let incompleteChunk = '';
          while (!done) {
            const { value, done: streamDone } = await (reader as ReadableStreamDefaultReader).read();
            done = streamDone;

            if (value) {
              const decodedValue = new TextDecoder().decode(value);
              const fullData = incompleteChunk + decodedValue; // Добавляем предыдущий незавершенный кусок
              const lines = fullData.split('\n');
              incompleteChunk = lines.pop() || ''; // Сохраняем последнюю строку, если она неполная

              const result = {};

              lines.forEach((line) => {
                try {
                  const [key, ...rest] = line.split(': ');
                  const value = rest.join(': ').trim();
                  if (!key || !value) return;

                  if (value.startsWith('{')) {
                    try {
                      // @ts-expect-error - enable adding new keys to object
                      result[key] = JSON.parse(value);
                    } catch (jsonError) {
                      console.warn(`Ошибка при парсинге JSON для ключа "${key}":`, jsonError);
                    }
                  } else {
                    // @ts-expect-error - enable adding new keys to object
                    result[key] = value;
                  }
                } catch (lineError) {
                  console.error('Ошибка при обработке строки:', line, lineError);
                }
              });

              try {
                body.onChunk(result as MessageStream);
              } catch (chunkError) {
                console.error('Ошибка при обработке чанка данных:', chunkError);
              }
            }
          }
        },
      }),
    }),
  }),
});

export default chatApi;
