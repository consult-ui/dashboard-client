import chatApi from '@/app/api/api-list/chat.ts';
import etcApi from '@/app/api/api-list/etc.ts';
import organizationsApi from '@/app/api/api-list/organizations.ts';
import userApi from '@/app/api/api-list/user.ts';

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useMeQuery,
  useSignInMutation,
  useSignOutMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
} = userApi;

export const {
  useOrganizationsQuery,
  useLazyOneOrganizationQuery,
  useCreateOrganizationMutation,
  useMyOrganizationQuery,
} = organizationsApi;

export const {
  useChatCreateMutation,
  useChatDeleteMutation,
  useChatListQuery,
  useAssistantListQuery,
  useChatUpdateMutation,
  useUploadFileMutation,
  useDeleteFileMutation,
  useSendMessageMutation,
  useMessagesListQuery,
  useQuestionsListQuery,
} = chatApi;

export const { useAdviceQuery } = etcApi;
