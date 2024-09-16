import { ServerResponse } from '@/app/api/types/index.ts';
import { PayloadCreateCompany } from '@/entities/company/company-initial-form/types';

export interface OrganizationSuggests extends ServerResponse {
  data: OrganizationSuggestItem[];
}

export type OrganizationSuggestItem = {
  head_name: string | null;
  name: string;
  tax_number: string;
};

export interface Organization extends ServerResponse {
  data: OrganizationItem;
}
export interface OrganizationItem extends OrganizationSuggestItem {
  address: string;
  activity_type: string;
}

export interface MyOrganization extends ServerResponse {
  data: MyOrganizationBody;
}
export interface MyOrganizationBody extends Omit<PayloadCreateCompany, 'context'> {
  id: number;
}
