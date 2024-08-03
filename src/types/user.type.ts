import { Role } from '../utils/common'

export interface UserType {
  id: string
  name: string
  email: string
  password: string
  phone_number: string
  role?: Role
}
