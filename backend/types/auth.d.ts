import type { JwtPayload } from "jsonwebtoken"

export interface RegisterBody {
  email: string,
  password: string,
  confirm_password: string
}

export interface LoginBody {
  email: string,
  password: string
}

export interface AccessJWTokenPayload extends JwtPayload{
  id :string,
  email: string,
}