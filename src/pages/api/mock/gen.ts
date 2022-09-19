import {NextApiRequest, NextApiResponse} from "next";
import {
    clientsDto,
    projectsDto,
    projectUserAssignsDto,
    tasksDto,
    userGroupAssigns,
    userGroupsDto,
    userRoles,
    userRolesDtoAssign,
    usersDto
} from "../../../mock/sampleData";

export default function (req: NextApiRequest, res: NextApiResponse) {
    return res.status(200).json({
        usersDto,
        clientsDto,
        projectsDto,
        userGroupsDto,
        userGroupAssigns,
        projectUserAssignsDto,
        tasksDto,
        userRolesDtoAssign,
        userRoles
    });
}