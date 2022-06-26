import { createDocument, updateDocument } from 'services/firestore'
import firebase from 'firebase/compat/app'
import { Student } from 'models'
import { message } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useSemester } from 'contexts/SemesterContext'

const useAdvancedFormActions = ({ initialData, form, marks, setMarks }) => {
  const history = useHistory()
  const params = useParams()
  const { semester } = useSemester()
  const { groupId, studentId } = params
  const [loading, setLoading] = useState(false)

  const onFinish = async () => {
    setLoading(true)
    const dataForValidate = {
      ...form.getFieldsValue(),
      marks
    }
    if (!Student.validationSchema.isValidSync(dataForValidate)) {
      try {
        Student.validationSchema.validateSync(dataForValidate)
      } catch (e) {
        const [invalidTypeMessage] = e.message.split(',')
        message.error(invalidTypeMessage)
      }
      setLoading(false)
      return
    } else {
      if (!initialData) {
        createDocument(`groups/${groupId}/student`, {
          ...form.getFieldsValue()
        }).then(() => {
          message.success('Студента успішно створено')
          history.push(`/groups/${groupId}/students`)
        })
      } else {
        const {
          firstName,
          lastName,
          educationSystem,
          isTwelveSystem,
          averageMark
        } = form.getFieldsValue()
        const currentYears = semester.year.map((year) => year.year())
        const currentSemester = semester.semester
        const newAvgMarkId = firebase
          .firestore()
          .collection('groups')
          .doc(groupId)
          .collection('students')
          .doc(studentId)
          .collection('avgMarks')
          .doc().id

        updateDocument(`groups/${groupId}/students`, studentId, {
          _id: studentId,
          firstName,
          lastName,
          educationSystem: educationSystem ?? 'BUDGET'
        })
          .then(() => {
            firebase
              .firestore()
              .collection('groups')
              .doc(groupId)
              .collection('students')
              .doc(studentId)
              .collection('avgMarks')
              .doc(newAvgMarkId)
              .set({
                _id: newAvgMarkId,
                semester: currentSemester,
                year: currentYears,
                isTwelveSystem: isTwelveSystem ?? false,
                averageMark: averageMark ?? 0
              })
          })
          .then(() => {
            message.success('Студента успішно оновлено')
            history.push(`/groups/${groupId}/students/${studentId}`)
          })
        setLoading(false)
      }
    }
  }

  const onReset = () => {
    form.resetFields()
    setMarks([])
    history.push(`/groups/${groupId}/students/${studentId}`)
  }

  return { onFinish, onReset, loading }
}

export default useAdvancedFormActions
