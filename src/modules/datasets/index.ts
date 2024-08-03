import { IDataset } from '../../types/interfaces'
import BBperU_Male from './BBperU_Male'
import BBperU_Female from './BBperU_Female'

export const BBperU: IDataset = {
  M: BBperU_Male,
  F: BBperU_Female,
  categories: [
    [-3, 'Severely Underweight'],
    [-2, 'Underweight'],
    [1, 'Normal']
  ],
  fallbackCategory: 'Overweight'
}
