import { faker } from "@faker-js/faker";
import { Project, UserGroupAssign } from "./types";
import {
  ClientDto,
  ProjectDto,
  ProjectUserAssignDto,
  TagDto,
  TaskDto,
  UserDto,
  UserGroupDto,
  UserRoleAssign,
  UserRoleDto,
} from "./typesDto";

// generate 1000 sample project objects
// @ts-ignore
export const projects: Project[] = [...Array(1000)].map((_, i) => ({
  id: faker.datatype.number(),
  name: faker.company.name(),
  client: {
    id: faker.datatype.number(),
    name: faker.company.name(),
    note: faker.lorem.paragraph(),
  },
  tasks: [...Array(5)].map((_, i) => ({
    id: faker.datatype.number(),
    description: faker.lorem.paragraph(),
    project: {
      id: i,
      name: faker.company.name(),
      client: {
        id: faker.datatype.number(),
        name: faker.company.name(),
        note: faker.lorem.paragraph(),
      },
    },
  })),
}));

// generate 50 sample UserDto objects
export const usersDto: UserDto[] = [];

// generate 50 sample ClientDto objects
export const clientsDto: ClientDto[] = [];

// generate 50 sample ProjectDto objects
export const projectsDto: ProjectDto[] = [];

// generate 50 sample UserGroupDto objects
export const userGroupsDto: UserGroupDto[] = [];

// generate 50 sample UserGroupAssign objects
export const userGroupAssigns: UserGroupAssign[] = [];

// generate 50 sample ProjectUserAssignDto objects
export const projectUserAssignsDto: ProjectUserAssignDto[] = [];

// TODO
// const projectUserAssignsDtoData  = [...Array(50)].map(
//     (_, i) => ({
//       id: i,
//       projectId: faker.datatype.number(),
//       userId: usersDto[Math.floor(Math.random() * usersDto.length)]?.userId ?? 0,
//     })
// );

// projectUserAssignsDto.push(...projectUserAssignsDtoData);

// generate 50 sample TaskDto objects
export const tasksDto: TaskDto[] = [];

export const userRolesDtoAssign: UserRoleAssign[] = [];

export const userRoles: UserRoleDto[] = [
  {
    id: 0,
    name: "ADMIN",
  },
  {
    id: 1,
    name: "USER",
  },
  {
    id: 2,
    name: "MANAGER",
  },
  {
    id: 3,
    name: "OOO",
  },
];

const usersDtoData =  [...Array(50)].map((_, i) => ({
  id: i,
  name: faker.name.firstName(),
  surname: faker.name.lastName(),
  email: faker.internet.email(),
  managerId: null,
  createdAt: faker.date.past(),
  deletedAt: null,
  updatedAt: null,
}));
usersDto.push(...usersDtoData);

const withManagers =  usersDto.map(user => {
  const cp = {
    ...user
  }
  if ( Math.random() > 0.25 ) {
    cp.managerId = usersDto[Math.floor(Math.random() * usersDto.length)]?.id ?? 0;
  }
  return cp;
})

usersDto.splice(0, usersDto.length, ...withManagers);

const clientsDtoData = [...Array(50)].map((_, i) => ({
  id: i,
  name: faker.company.name(),
  note: faker.lorem.lines(5),
  createdAt: faker.date.past(),
  deletedAt: null,
  updatedAt: null,
}));
clientsDto.push(...clientsDtoData);



const projectsDtoData = [...Array(50)].map((_, i) => ({
  id: i,
  name: faker.company.name(),
  clientId: clientsDto[Math.floor(Math.random() * clientsDto.length)]?.id ?? 0,
  createdAt: faker.date.past(),
  deletedAt: null,
  updatedAt: null,
}));
projectsDto.push(...projectsDtoData);

// TODO
// const userGroupAssignsData = [...Array(50)].map(
//     (_, i) => ({
//       id: i,
//       groupId: faker.datatype.number(),
//       userId: usersDto[Math.floor(Math.random() * usersDto.length)]?.userId ?? 0,
//     })
// );
// userGroupAssigns.push(...userGroupAssignsData);


const tasksDtoData = [...Array(50)].map((_, i) => ({
  id: i,
  description: faker.lorem.paragraph(),
  projectId: usersDto[Math.floor(Math.random() * usersDto.length)]?.id ?? 0,
  createdAt: faker.date.past(),
  deletedAt: null,
  updatedAt: null,
}));
tasksDto.push(...tasksDtoData);

userRolesDtoAssign.push(...((): UserRoleAssign[] => {
  let result: UserRoleAssign[] = [];
  usersDto.forEach((u, idx) => {
    result.push({
      id: idx,
      ownerId: u.id,
      roleId: userRoles[Math.floor(Math.random() * userRoles.length)].id ?? 0,
    });
  });
  return result;
})());
