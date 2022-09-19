import { NextApiRequest, NextApiResponse } from "next";
import {projects, projectsDto} from "../../mock/sampleData";

export interface Image {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export default async function Projects(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json(projectsDto);
}
