import { useMeQuery, useMyOrganizationQuery } from '@/app/api';

export const useGetInfoOrganization = () => {
  const { data: me } = useMeQuery();
  const { data, isLoading, isError } = useMyOrganizationQuery(
    { organization_id: me?.data?.organization_id as number },
    { skip: !me?.data?.organization_id },
  );
  return { data, isLoading, isError };
};
