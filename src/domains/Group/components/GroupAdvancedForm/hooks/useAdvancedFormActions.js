import {
  createDocument,
  saveHasManyRelationship,
  updateDocument
} from 'services/firestore'

import { Group } from 'models'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

const useAdvancedFormActions = ({
  initialData,
  form,
  students,
  setStudents
}) => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const onFinish = async () => {
    setLoading(true)
    const dataForValidate = {
      ...form.getFieldsValue(),
      students
    }
    if (!Group.validationSchema.isValidSync(dataForValidate)) {
      try {
        Group.validationSchema.validateSync(dataForValidate)
      } catch (e) {
        const [invalidTypeMessage] = e.message.split(',')
        message.error(invalidTypeMessage)
      }
      setLoading(false)
      return
    } else {
      if (!initialData) {
        createDocument('groups', {
          ...form.getFieldsValue(),
          students: await saveHasManyRelationship('students', students)
        }).then(() => {
          message.success('Group created successfully')
          history.goBack()
        })
      } else {
        const { group } = initialData
        updateDocument('groups', group?._id, {
          ...form.getFieldsValue(),
          students: await saveHasManyRelationship('students', students)
        }).then(() => {
          message.success('Group successfully updated')
          history.goBack()
        })
      }
    }
  }

  const onReset = () => {
    form.resetFields()
    setStudents([])
    history.push('/groups')
  }

  return { onFinish, onReset, loading }
}

export default useAdvancedFormActions
