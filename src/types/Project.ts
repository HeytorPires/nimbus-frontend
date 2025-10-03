export interface Project {
  id?: string;
  name: string;
  description: string;
  repository: string;
  var_env: string;
  created_at?: Date;
  updated_at?: Date;
  created_by: string;
}
