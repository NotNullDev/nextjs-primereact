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

//
// // generate 50 sample UserDto objects
// export const usersDto: UserDto[] = [];
// const usersDtoData = usersDto.map((_, i) => ({
//   userId: i,
//   name: faker.name.firstName(),
//   surname: faker.name.lastName(),
//   email: faker.internet.email(),
//   managerId: usersDto[Math.floor(Math.random() * usersDto.length)]?.userId ?? 0,
// }));
// usersDto.push(...usersDtoData);
//
//
//
//
// // generate 50 sample ClientDto objects
// export const clientsDto: ClientDto[] = [];
//
// const clientsDtoData = [...Array(50)].map((_, i) => ({
//   id: i,
//   name: faker.company.name(),
//   note: faker.lorem.lines(5),
// }));
//
// clientsDto.push(...clientsDtoData);
//
//
//
// // generate 50 sample ProjectDto objects
// export const projectsDto: ProjectDto[] = [];
//
// const projectsDtoData = [...Array(50)].map((_, i) => ({
//   id: i,
//   name: faker.company.name(),
//   clientId: clientsDto[Math.floor(Math.random() * clientsDto.length)]?.id ?? 0,
// }));
// projectsDto.push(...projectsDtoData);
//
//
//
// // generate 50 sample UserGroupDto objects
// export const userGroupsDto: UserGroupDto[] = [];
//
//
// // generate 50 sample UserGroupAssign objects
// export const userGroupAssigns: UserGroupAssign[] = [];
//
// const userGroupsDtoData = [...Array(50)].map((_, i) => ({
//   id: i,
//   name: faker.company.name(),
// }));
//
//
// const userGroupAssignsData = [...Array(50)].map(
//     (_, i) => ({
//       id: i,
//       groupId: faker.datatype.number(),
//       userId: usersDto[Math.floor(Math.random() * usersDto.length)]?.userId ?? 0,
//     })
// );
// userGroupAssigns.push(...userGroupAssignsData);
//
//
// // generate 50 sample ProjectUserAssignDto objects
// export const projectUserAssignsDto: ProjectUserAssignDto[] = [];
//
// const projectUserAssignsDtoData = [...Array(50)].map(
//     (_, i) => ({
//       id: i,
//       projectId: faker.datatype.number(),
//       userId: usersDto[Math.floor(Math.random() * usersDto.length)]?.userId ?? 0,
//     })
// );
//
// projectUserAssignsDto =
//
//
// // generate 50 sample TaskDto objects
// export const tasksDto: TaskDto[] = [...Array(50)].map((_, i) => ({
//   id: i,
//   description: faker.lorem.paragraph(),
//   projectId: usersDto[Math.floor(Math.random() * usersDto.length)]?.userId ?? 0,
// }));
//
// export const userRolesDtoAssign: UserRoleAssign[] = ((): UserRoleAssign[] => {
//   let result: UserRoleAssign[] = [];
//   usersDto.forEach((u, idx) => {
//     result.push({
//       id: idx,
//       ownerId: u.userId,
//       roleId: userRoles[Math.floor(Math.random() * userRoles.length)].id ?? 0,
//     });
//   });
//   return result;
// })();
//
// export const userRoles: UserRoleDto[] = [
//   {
//     id: 0,
//     name: "ADMIN",
//   },
//   {
//     id: 1,
//     name: "USER",
//   },
//   {
//     id: 2,
//     name: "MANAGER",
//   },
//   {
//     id: 3,
//     name: "OOO",
//   },
// ];
// // generate 50 sample TagDto objects
