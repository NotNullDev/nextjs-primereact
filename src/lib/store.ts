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