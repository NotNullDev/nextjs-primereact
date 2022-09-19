import {UserDto} from "../typesDto";

export function updateUser(user: UserDto) {

}

export function deleteUser(user: UserDto): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        resolve(false);
    });
}

export function createUser(user: UserDto) {
    return new Promise<boolean>((resolve, reject) => {
        resolve(false);
    });
}

export const userService = {
    updateUser,
    deleteUser,
    createUser
}