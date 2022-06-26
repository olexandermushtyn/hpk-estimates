import { useSemester } from 'contexts/SemesterContext'
import firebase from 'firebase/compat/app'
import { useCallback } from 'react'

const arraysEqual = (a1, a2) => {
  return JSON.stringify(a1) === JSON.stringify(a2)
}

const useStudentEvaluation = () => {
  const { currentYears, semester } = useSemester()
  const getStudentEvaluation = useCallback(
    async (groupId, studentId) => {
      const evaluations = await firebase
        .firestore()
        .collection(`groups/${groupId}/students/${studentId}/marks`)
        .get()

      const evaluationData = evaluations.docs.map((evaluation) =>
        evaluation.data()
      )
      const currentEvaluations = evaluationData.filter(
        (evaluation) =>
          arraysEqual(evaluation.year, currentYears) &&
          evaluation.semester === semester.semester
      )

      const evaluationsWithCoefficientData = []

      for (const evaluation of currentEvaluations) {
        const coefficient = await firebase
          .firestore()
          .collection('evalutaions')
          .doc(evaluation.evaluation)
          .collection('coefficients')
          .doc(evaluation.coefficient)
          .get()

        const coefficientData = coefficient.data()

        evaluationsWithCoefficientData.push({
          ...evaluation,
          coefficientData
        })
      }

      let sum = 0
      return evaluationsWithCoefficientData.reduce((acc, evv) => {
        const { coefficientData } = evv
        const codeKey = `${evv.evaluation}code`
        const markKey = `${evv.evaluation}mark`
        sum += coefficientData?.mark ? coefficientData?.mark : 0
        return {
          ...acc,
          [codeKey]: coefficientData?.code ?? '-',
          [markKey]: coefficientData?.mark ?? '-',
          totalMark: sum
        }
      }, {})
    },
    [currentYears, semester.semester]
  )

  return getStudentEvaluation
}

export default useStudentEvaluation
