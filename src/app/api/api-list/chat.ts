import { baseQueryWithReauth } from '@/app/api/constants';
import { createApi } from '@reduxjs/toolkit/query/react';

const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    chatList: builder.query<unknown, void>({
      query: () => '/chat/list',
    }),
    assistantList: builder.query<unknown, void>({
      query: () => '/chat/assistant/list',
    }),
    chatCreate: builder.mutation<unknown, { assistant_id: number }>({
      query: (body: { assistant_id: number }) => ({
        url: '/chat/create',
        method: 'POST',
        body,
      }),
    }),
    chatDelete: builder.mutation<unknown, { chat_id: number }>({
      query: (body: { chat_id: number }) => ({
        url: `/chat/${body.chat_id}/delete`,
        method: 'POST',
      }),
    }),
  }),
});

export default chatApi;
