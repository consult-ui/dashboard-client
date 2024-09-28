import { useMeQuery, useMyOrganizationQuery } from '@/app/api';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export const useGetInfoOrganization = () => {
  const { data: me } = useMeQuery();
  const { data, isLoading, isError } = useMyOrganizationQuery(
    { organization_id: me?.data?.organization_id as number },
    { skip: !me?.data?.organization_id },
  );

  useEffect(() => {
    if (data?.data?.id) {
      Cookies.set('x-org-id', String(data.data.id), { expires: 90 });
    } else {
      Cookies.remove('x-org-id');
    }
  }, [data]);

  return { data, isLoading, isError };
};
