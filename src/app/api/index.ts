import userApi from './apiList/user.ts';

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const { useMeQuery, useSignInMutation } = userApi;
