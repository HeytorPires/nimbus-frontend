export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  created_at?: string;
  updated_at?: string;
}
