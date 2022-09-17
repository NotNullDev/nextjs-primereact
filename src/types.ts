import { SpawnSyncOptionsWithBufferEncoding } from "child_process";

export type User = {
  userId: number;
  name: string;
  surname: string;
  email: string;
  roles: UserRole[];
  manager: User;
};

export type UserRole = {
  owner: User;
  name: string;
};

//??
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
  note: SpawnSyncOptionsWithBufferEncoding;
};

// generate 1000 example project objects

export type Project = {
  id: number;
  name: string;
  client: Client;
  tasks: Task[];
};

export type Task = {
  id: number;
  description: string;
  project: Project;
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
};
