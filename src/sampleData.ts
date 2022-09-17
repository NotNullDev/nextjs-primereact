import { faker } from "@faker-js/faker";

// generate 1000 sample project objects
export const projects = [...Array(1000)].map((_, i) => ({
  id: i,
  name: faker.company.name(),
  client: {
    id: faker.datatype.number(),
    name: faker.company.name(),
    note: faker.lorem.paragraph(),
  },
  tasks: [...Array(5)].map((_, i) => ({
    id: i,
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
