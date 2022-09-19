import create from "zustand";
import {UserDto} from "../typesDto";

export type CurrentUserStore = {
    currentUser: UserDto | null;
    setCurrentUser: (user: UserDto | null) => void;
}

const useCurrentUserStore = create<CurrentUserStore>(set => ({
    currentUser: null,
    setCurrentUser: (user: UserDto | null) => set({currentUser: user})
}))

export function login() {
    useCurrentUserStore.getState().setCurrentUser({
        id: -1,
        name: "SYSTEM",
        updatedAt: null,
        createdAt: new Date(),
        deletedAt: null,
        managerId: null,
        email: "",
        surname: "SYSTEM",
        editedById: null
    });
}

export function logout() {
    useCurrentUserStore.getState().setCurrentUser(null);
}

export const useCurrentUser = () => useCurrentUserStore();