import { IRefresh } from '@/app/api/types/user.ts';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get('access_token');
    const orgId = Cookies.get('x-org-id');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (orgId) {
      headers.set('x-org-id', orgId);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = Cookies.get('refresh_token');

  if (result?.error?.status === 401 && refreshToken) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await fetch(import.meta.env.VITE_API_URL + '/auth/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
        const refreshResJSON: IRefresh = await refreshResult.json();
        if (refreshResJSON?.success) {
          console.log('%cTOKEN WAS SUCCESS UPDATED!', 'color: green');
          Cookies.set('access_token', refreshResJSON.data.access_token, { expires: 90 });
          Cookies.set('refresh_token', refreshResJSON.data.refresh_token, { expires: 90 });
          result = await baseQuery(args, api, extraOptions);
        } else {
          toast('Ошибка обн. пользователя! Пожалуйста, войдите в систему заново!', {
            toastId: 'err_refresh_token',
            type: 'error',
            autoClose: 3000,
          });
          release();
          // TODO: add clear user data and navigate to login
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};
