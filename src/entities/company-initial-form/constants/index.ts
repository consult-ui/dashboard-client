import { PayloadCreateCompany } from '@/entities/company-initial-form/types';

export const initialData: PayloadCreateCompany = {
  name: '',
  activity_type: '',
  tax_number: '',
  head_name: '',
  address: '',
  quarterly_income: 0,
  quarterly_expenses: 0,
  number_employees: 0,
  average_receipt: 0,
  context: '',
};
