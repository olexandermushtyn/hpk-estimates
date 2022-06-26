import { useParams } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'

export default function useStudentMarks(student) {
  const params = useParams()
  const { groupId, studentId } = params

  const [marks, loading] = useCollectionDataOnce(
    groupId &&
      studentId &&
      firebase
        .firestore()
        .collection('groups')
        .doc(groupId)
        .collection('students')
        .doc(studentId)
        .collection('marks')
  )
  return [marks, loading]
}
