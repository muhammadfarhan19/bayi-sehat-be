import { Role } from '../utils/common'

export interface UserType {
  name: string
  email: string
  password: string
  phone_number: string
  role?: Role
}
