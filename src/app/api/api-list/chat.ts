import { baseQueryWithReauth } from '@/app/api/constants';
import { ServerResponse } from '@/app/api/types';
import { Assistants, Chats } from '@/app/api/types/chat.ts';
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
  }),
});

export default chatApi;
