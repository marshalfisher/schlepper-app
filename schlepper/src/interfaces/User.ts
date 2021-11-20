export interface User {
  username: string;
  password: string;
  email?: string;
  collection?: string;
  wants?: string;
  state?: string;
  city?: string;
  photo?: string;
}
