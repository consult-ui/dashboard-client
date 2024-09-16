import { OrganizationItem } from '@/app/api/types/organizations.ts';

export interface PayloadCreateCompany extends OrganizationItem {
  context: string;
  quarterly_income: number; // квартальный_доход
  quarterly_expenses: number; // квартальные_расходы
  number_employees: number; // количество_сотрудников
  average_receipt: number; //средний_чек
}
