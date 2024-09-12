import { baseQueryWithReauth } from '@/app/api/constants';
import { IRefresh, Me, Response } from '@/app/api/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

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
    signOut: builder.mutation<Response, void>({
      query: () => ({
        url: '/auth/sign-out',
        method: 'POST',
        body: { refresh_token: Cookies.get('refresh_token') },
      }),
    }),
    resetPassword: builder.mutation<Response, { email: string }>({
      query: (body: { email: string }) => ({
        url: '/user/reset-password',
        method: 'POST',
        body,
      }),
    }),
    changePassword: builder.mutation<Response, { reset_code: string; new_password: string; email: string }>({
      query: (body: { reset_code: string; new_password: string; email: string }) => ({
        url: '/user/change-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default userApi;
