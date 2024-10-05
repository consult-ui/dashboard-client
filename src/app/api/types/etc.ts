import { ServerResponse } from '@/app/api/types/index.ts';

export interface Advice extends ServerResponse {
  data: string;
}
