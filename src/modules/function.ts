import { AnalyzerFunc, ScoringFunc } from '..//types/interface'
import { BBperU } from './datasets'

export const Analyzer: AnalyzerFunc = ({ weight, gender, age }) => {
  // const age = moment(until || new Date()).diff(birth, 'months')
  // const IMT = getIMTScore(weight, height)

  return {
    BBperU: getScore({ dataset: BBperU, value: weight, idx: age, gender })
    // TBperU: getScore({ dataset: TBperU, value: height, idx: age, gender }),
    // BBperPB:
    //   age < 24
    //     ? getScore({
    //         dataset: BBperPB24,
    //         value: weight,
    //         idx: (Math.round(height) - 45) * 2,
    //         gender
    //       })
    //     : age < 60
    //     ? getScore({
    //         dataset: BBperPB60,
    //         value: weight,
    //         idx: (Math.round(height) - 65) * 2,
    //         gender
    //       })
    //     : null,
    // IMT: age > 60 ? IMT : null,
    // IMTperU: getScore({
    //   dataset: IMTperU,
    //   value: IMT.score,
    //   idx: age - 61,
    //   gender
    // })
  }
}

const getScore: ScoringFunc = ({ dataset, gender, idx, value }) => {
  if (idx < 0) return null
  const datasetItem = dataset[gender].at(idx)
  if (!datasetItem) return null
  const [median, ds] = datasetItem
  let score = (value - median) / Math.abs(median - ds)
  score = parseFloat(score.toFixed(3))

  const categories = dataset.categories.sort(([a], [b]) => a - b)
  for (const [upperLimit, category] of categories) {
    if (score < upperLimit) return { score, category }
  }
  return { score, category: dataset.fallbackCategory }
}

// const getIMTScore = (weight: number, height: number): { score: number; category: string } => {
//   const score = weight / ((height * height) / 10000)
//   const category = '-'

//   return { score, category }
// }
