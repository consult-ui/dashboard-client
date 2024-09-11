export type Response = {
  errors: null;
  msg: string;
  success: boolean;
};

export interface IRefresh extends Response {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface Me extends Response {
  data: {
    email: string;
    expiration_date: string;
    first_name: string;
    id: number;
    last_name: string;
    phone_number: string;
  };
}
