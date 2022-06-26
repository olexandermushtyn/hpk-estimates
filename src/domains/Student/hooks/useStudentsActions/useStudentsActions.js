import { useState } from 'react'
import firebase from 'firebase/compat/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { message } from 'antd'

const useStudentsActions = () => {
  const [loading, setLoading] = useState(false)
  const [groups] = useCollectionData(firebase.firestore().collection('groups'))

  const uploadStudents = async (students) => {
    setLoading(true)
    const existGroups = new Set(groups)
    for (const student of students) {
      const [lastName, firstName, thirdName, groupName] = student
      if (lastName && firstName && groupName) {
        const group = Array.from(existGroups).find(
          (group) => group.name === groupName
        )
        if (group) {
          const groupStudentsSnapshot = await firebase
            .firestore()
            .collection('groups')
            .doc(group?._id)
            .collection('students')
            .get()

          const groupStudents = groupStudentsSnapshot.docs.map((doc) =>
            doc.data()
          )

          if (
            !groupStudents.find(
              (student) =>
                student.lastName === lastName &&
                student.firstName === firstName &&
                student.thirdName === thirdName
            )
          ) {
            const newStudentId = await firebase
              .firestore()
              .collection('groups')
              .doc(group?._id)
              .collection('students')
              .doc().id

            await firebase
              .firestore()
              .collection('groups')
              .doc(group?._id)
              .collection('students')
              .doc(newStudentId)
              .set({
                firstName,
                lastName,
                thirdName,
                _id: newStudentId
              })
          }
        } else {
          const newGroupId = await firebase
            .firestore()
            .collection('groups')
            .doc().id

          existGroups.add({ _id: newGroupId, name: groupName })

          await firebase.firestore().collection('groups').doc(newGroupId).set({
            name: groupName,
            _id: newGroupId
          })

          const newStudentId = await firebase
            .firestore()
            .collection('groups')
            .doc(newGroupId)
            .collection('students')
            .doc().id

          await firebase
            .firestore()
            .collection('groups')
            .doc(newGroupId)
            .collection('students')
            .doc(newStudentId)
            .set({
              firstName,
              lastName,
              _id: newStudentId
            })
        }
      }
    }
    setLoading(false)
    message.success('Дані успішно завантажено!')
  }

  return {
    loading,
    uploadStudents
  }
}

export default useStudentsActions
