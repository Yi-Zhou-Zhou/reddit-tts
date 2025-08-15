import {create} from 'zustand'

interface SidebarType{
    open: boolean,
    toggleSidebar: () => void
}
export const useSidebar = create<SidebarType>()((set) => ({
    open: true,
    toggleSidebar: () => set((state) => ({open: !state.open}))
}))