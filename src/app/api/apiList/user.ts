import { baseQueryWithReauth } from '@/app/api/constants';
import { createApi } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    me: builder.query<{ login: string }, void>({
      query: () => '/me',
    }),
    signIn: builder.mutation({
      query: (body: { login: string; password: string; type: 'login' | 'phone' }) => ({
        url: '/sign-in',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default userApi;
