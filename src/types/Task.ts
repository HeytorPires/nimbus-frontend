export interface Task {
  id?: string;
  title: string;
  tags?: string;
  description: string;
  repository: string;
  var_env: string;
  created_at?: Date;
  updated_at?: Date;
  created_by: string;
  tag_id?: string | null;
}
