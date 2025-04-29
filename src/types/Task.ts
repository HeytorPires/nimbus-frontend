export interface Task {
  id: string;
  title: string;
  tags: string;
  description: string;
  created_at?: Date;
  state: string;
  created_by: Date;
}
