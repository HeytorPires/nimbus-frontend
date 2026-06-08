export interface IProject {
  id?: string;
  title: string;
  description: string;
  repository: string;
  tag_id?: string;
  variablesEnvironment: string;
  created_at?: Date;
  updated_at?: Date;
  user_id: string;
}
