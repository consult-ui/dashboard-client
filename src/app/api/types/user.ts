import { ServerResponse } from '@/app/api/types/index.ts';

export interface IRefresh extends ServerResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface Me extends ServerResponse {
  data: {
    email: string;
    expiration_date: string;
    first_name: string;
    id: number;
    organization_id: number | null;
    last_name: string;
    phone_number: string;
  };
}
