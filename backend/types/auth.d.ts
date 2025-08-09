export interface RegisterBody {
  email: string,
  password: string,
  confirm_password: string
}

export interface LoginBody {
  email: string,
  password: string
}