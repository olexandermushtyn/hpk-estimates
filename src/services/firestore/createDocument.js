import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

import { firestore } from '../firebase'
import { getId } from 'services/firestore'
import { transformMomentToDate } from './'

const createDocument = async (collectionPath, documentData) => {
  const id = getId(collectionPath)
  const ref = doc(firestore, collectionPath, id)
  const transformedData = transformMomentToDate(documentData)
  await setDoc(ref, {
    _id: id,
    ...transformedData,
    _createdAt: serverTimestamp()
  })

  return { id }
}

export default createDocument
