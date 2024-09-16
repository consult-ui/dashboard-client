import { baseQueryWithReauth } from '@/app/api/constants';
import { ServerResponse } from '@/app/api/types';
import { MyOrganization, Organization, OrganizationSuggests } from '@/app/api/types/organizations.ts';
import { PayloadCreateCompany } from '@/entities/company/company-initial-form/types';
import { createApi } from '@reduxjs/toolkit/query/react';

const organizationsApi = createApi({
  reducerPath: 'organizationsApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    organizations: builder.query<OrganizationSuggests, { query: string }>({
      query: (query: { query: string }) => '/organization/suggest?q=' + query.query,
    }),
    oneOrganization: builder.query<Organization, { tax_number: string }>({
      query: (query: { tax_number: string }) => '/organization/search?tax_number=' + query.tax_number,
    }),
    createOrganization: builder.mutation<ServerResponse, PayloadCreateCompany>({
      query: (body: PayloadCreateCompany) => ({
        url: '/organization/create',
        method: 'POST',
        body,
      }),
    }),
    myOrganization: builder.query<MyOrganization, { organization_id: number }>({
      query: (query: { organization_id: number }) => '/organization/' + query.organization_id,
    }),
  }),
});

export default organizationsApi;
