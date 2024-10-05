import { baseQueryWithReauth } from '@/app/api/constants';
import { Advice } from '@/app/api/types/etc.ts';
import { createApi } from '@reduxjs/toolkit/query/react';

const etcApi = createApi({
  reducerPath: 'etcApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    advice: builder.query<Advice, void>({
      query: () => '/etc/tip',
    }),
  }),
});

export default etcApi;
