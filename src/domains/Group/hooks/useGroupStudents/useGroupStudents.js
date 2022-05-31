import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'

export default function useGroupStudents(group) {
  const [students, loading] = useCollectionData(
    firebase
      .firestore()
      .collection('groups')
      .doc(group)
      .collection('students')
      .orderBy('lastName', 'asc')
  )

  return [students, loading]
}
