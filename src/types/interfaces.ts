export type Gender = 'M' | 'F'
export type IDatasetItem = [median: number, ds: number]
export type ICategory = [upperLimit: number, categoryName: string]

export interface IDataset {
  M: IDatasetItem[]
  F: IDatasetItem[]
  categories: ICategory[]
  fallbackCategory: string
}

export interface ScoringInput {
  dataset: IDataset
  value: number
  idx: number
  gender: Gender
}

export interface AnalyzerInput {
  birth?: Date
  weight: number
  height?: number
  gender: Gender | 'M' | 'F'
  until?: Date
  age: number
}

export interface AnalyzerOutput {
  BBperU: ScoringOutput
  // TBperU: ScoringOutput
  // BBperPB: ScoringOutput

  // IMT: ScoringOutput
  // IMTperU: ScoringOutput
}

export type AnalyzerFunc = (input: AnalyzerInput) => AnalyzerOutput
export type ScoringFunc = (input: ScoringInput) => ScoringOutput
export type ScoringOutput = {
  score: number
  category: string
} | null
