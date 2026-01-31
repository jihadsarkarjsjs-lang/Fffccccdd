
export interface UserDetails {
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  cashBackBalance: string;
}

export interface InvoiceData {
  logo: string | null;
  userDetails: UserDetails;
  paymentAmount: string;
  paymentMethod: string;
  subject: string;
  note: string;
  isActivated: boolean;
}
