export enum EFormFields {
  INN = 'inn',
  COMPANY_NAME = 'companyName',
  DESCRIPTION = 'description',
  INDUSTRY = 'industry',
}
export interface IFormData {
  [EFormFields.INN]: string;
  [EFormFields.COMPANY_NAME]: string;
  [EFormFields.DESCRIPTION]: string;
  [EFormFields.INDUSTRY]: string;
}
