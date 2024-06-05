


export interface Account {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  username: string;
  createdAt: string;
  updatedAt?: string;
  twitterLink?: string;
  telegramLink?: string;
  phone?: string;
  roles?: string[];
}
