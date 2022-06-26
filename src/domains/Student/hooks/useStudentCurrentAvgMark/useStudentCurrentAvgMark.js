import { useSemester } from 'contexts/SemesterContext'
import firebase from 'firebase/compat/app'
import { useCallback } from 'react'

const arraysEqual = (a1, a2) => {
  return JSON.stringify(a1) === JSON.stringify(a2)
}

const useStudentCurrentAvgMark = () => {
  const { currentYears, semester } = useSemester()

  const getStudentCurrentAvgMark = useCallback(
    async (groupId, studentId) => {
      const avgMarks = await firebase
        .firestore()
        .collection(`groups/${groupId}/students/${studentId}/avgMarks`)
        .get()

      const currentAvgMark = avgMarks.docs.find(
        (mark) =>
          arraysEqual(mark.data().year, currentYears) &&
          mark.data().semester === semester.semester
      )

      return currentAvgMark ? currentAvgMark.data() : null
    },
    [currentYears, semester]
  )

  return getStudentCurrentAvgMark
}

export default useStudentCurrentAvgMark
