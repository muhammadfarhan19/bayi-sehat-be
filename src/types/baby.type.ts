import BabyConditionType from './condition.type'
import { Gender } from './interface'

export default interface BabyType {
  id: string
  name: string
  birthdate: string | Date
  gender: Gender
  parent_name: string
  phone_number: string
  baby_condition: BabyConditionType[]
}
