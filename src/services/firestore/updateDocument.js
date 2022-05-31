import { doc, serverTimestamp, updateDoc } from 'firebase/firestore'

import { firestore } from '../firebase'
import { transformMomentToDate } from './'

const updateDocument = async (collectionPath, id, data) => {
  const ref = doc(firestore, collectionPath, id)
  const transformedData = transformMomentToDate(data)
  return await updateDoc(ref, {
    ...transformedData,
    _updatedAt: serverTimestamp()
  })
}

export default updateDocument
