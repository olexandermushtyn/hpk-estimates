import {
  createDocument,
  saveHasManyRelationship,
  updateDocument
} from 'services/firestore'

import { Student } from 'models'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

const useAdvancedFormActions = ({ initialData, form, marks, setMarks }) => {
  const history = useHistory()
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
        createDocument('students', {
          ...form.getFieldsValue(),
          marks: await saveHasManyRelationship('marks', marks)
        }).then(() => {
          message.success('Student created successfully')
          history.goBack()
        })
      } else {
        const { student } = initialData
        updateDocument('students', student?._id, {
          ...form.getFieldsValue(),
          marks: await saveHasManyRelationship('marks', marks)
        }).then(() => {
          message.success('Student successfully updated')
          history.goBack()
        })
      }
    }
  }

  const onReset = () => {
    form.resetFields()
    setMarks([])
    history.push('/students')
  }

  return { onFinish, onReset, loading }
}

export default useAdvancedFormActions
