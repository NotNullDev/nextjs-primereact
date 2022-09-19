import { Project } from "../types";
import {projects} from "../mock/sampleData";

export interface Image {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export async function fetchProjects(): Promise<Project[]> {
  // const body = await fetch("http://localhost:3000/api/projects");
  // return body.json();
  return new Promise((resolve, reject) => {
    resolve(projects);
  });
}

export async function fetchNextProjects(
  from: number,
  amount: number
): Promise<Project[]> {
  return new Promise(async (resolve, reject) => {
    resolve((await fetchProjects()).slice(from, amount));
  });
}