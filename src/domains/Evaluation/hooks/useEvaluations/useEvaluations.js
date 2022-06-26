import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'

export default function useEvaluations(props) {
  const [value, loading] = useCollectionData(
    firebase.firestore().collection('evalutaions')
  )

  return [value, loading]
}
