import { Project } from "../types";

export interface Image {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export async function fetchProjects(): Promise<Project[]> {
  const body = await fetch("http://localhost:3000/api/projects");

  return body.json();
}

export async function fetchNextProjects(
  from: number,
  amount: number
): Promise<Project[]> {
  return new Promise(async (resolve, reject) => {
    resolve((await fetchProjects()).slice(from, amount));
  });
}
