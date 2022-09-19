export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  roles: UserRole[];
  manager: User | null;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
};

export type UserRole = {
  owner: User;
  name: string;
};

export type UserGroupAssign = {
  id: number;
  groupId: number;
  userId: number;
};

export type UserGroup = {
  id: number;
  name: string;
};

export type ProjectUserAssign = {
  id: number;
  projectId: number;
  userId: number;
};

export type Client = {
  id: number;
  name: string;
  note: string;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
};

// generate 1000 example project objects

export type Project = {
  id: number;
  name: string;
  client: Client;
  tasks: Task[];
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
  // history: number[]; // ??
};

export type Task = {
  id: number;
  description: string;
  project: Project;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
};

export type Tag = {
  id: number;
  note: string;
};

export type Tracker = {
  id: number;
  description: string;
  project: Project;
  date: Date;
  duration: number; // interval
  task: Task;
  user: User;
  billable: boolean;
  tags: Tag[];
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
};
