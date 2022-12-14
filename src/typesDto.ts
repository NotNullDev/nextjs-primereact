export type UserDto = {
  id: number;
  name: string;
  surname: string;
  email: string;
  managerId: number | null;
  editedById: number | null;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
};

export type UserRoleDto = {
  id: number;
  name: string;
};

export type UserRoleAssign = {
  id: number;
  ownerId: number;
  roleId: number;
};

export type UseGroupAssign = {
  id: number;
  groupId: number;
  userId: number;
};

export type UserGroupDto = {
  id: number;
  name: string;
};

export type ProjectUserAssignDto = {
  id: number;
  projectId: number;
  userId: number;
};

export type ClientDto = {
  id: number;
  name: string;
  note: string;
  editedById: number | null;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
};

// generate 1000 example project objects

export type ProjectDto = {
  id: number;
  name: string;
  clientId: number;
  editedById: number | null;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
};

export type TaskDto = {
  id: number;
  description: string;
  projectId: number;
  editedById: number | null;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
};

export type TagDto = {
  id: number;
  note: string;
};

export type TrackerTagAssign = {
  id: number;
  trackerId: number;
  tagId: number;
};

export type TrackerDto = {
  id: number;
  description: string;
  projectId: number;
  date: Date;
  duration: number; // interval
  taskId: number;
  userId: number;
  billable: boolean;
  editedById: number | null;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
};