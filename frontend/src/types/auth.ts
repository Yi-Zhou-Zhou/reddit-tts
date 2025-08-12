export interface User {
    username? :string,
    email: string,
}

export interface AuthState {
    isAuthenticated: boolean,
    user: User | null,
    login:(email: string, password: string) => void,
    register: (email: string, password: string, confirmPassword:string) => void,
    logout: () => void,
    fetchMe: () => void
}
