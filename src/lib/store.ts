import { type } from "os"
import create from "zustand"

setDarkMode: () => {

}

export type UserSettings = {
    darkMode: boolean,
    switchColorTheme: () => void
}

export const useUserSettingsStore = create<UserSettings>(set => ({ // todo: add persistance middleware
    darkMode: true,
    switchColorTheme: () => {
        console.log("User tried to switch themes");

        set(state => {
            return {
                darkMode: !state.darkMode
            }
        })
    }
}))
