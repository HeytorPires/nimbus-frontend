export interface IProject {
  id?: string;
  title: string;
  description: string;
  tagId?: string;
  variablesEnvironment: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
}
