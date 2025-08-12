import {create} from 'zustand'

interface userState{
    isAuthenticated: boolean,
    logInUser: () => void,
    logOutUser: () => void

}
export const useUser = create<userState>((set) => ({
    isAuthenticated: false,
    logInUser: () => set(() => ({isAuthenticated:true})),
    logOutUser: () => set(() => ({isAuthenticated:false}))
}))

