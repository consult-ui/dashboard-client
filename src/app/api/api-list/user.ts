import { baseQueryWithReauth } from '@/app/api/constants';
import { IRefresh, Me } from '@/app/api/types';
import { createApi } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    me: builder.query<Me, void>({
      query: () => '/user/me',
    }),
    signIn: builder.mutation<IRefresh, { login: string; password: string }>({
      query: (body: { login: string; password: string }) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default userApi;
