export interface AntropometricType {
  age_in_month: number 
  sd_minus_3: number 
  sd_minus_2: number 
  sd_minus_1: number 
  median: number 
  sd_plus_1: number 
  sd_plus_2: number 
  sd_plus_3: number 
}

export interface inputBabyType {
  id: string
  name: string
  birthdate: string | Date
  gender: string
  parent_name: string
  phone_number: string
  age: number
  baby_condition: Array<{ weight: number, height: number, months: number, updated_at: Date, created_at: Date }>
}
