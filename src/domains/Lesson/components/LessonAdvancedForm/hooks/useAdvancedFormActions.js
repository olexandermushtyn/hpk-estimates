import { createDocument } from 'services/firestore'

import { Lesson } from 'models'
import { message } from 'antd'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

const useAdvancedFormActions = ({ initialData, form }) => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const onFinish = async () => {
    setLoading(true)
    const dataForValidate = {
      ...form.getFieldsValue()
    }
    if (!Lesson.validationSchema.isValidSync(dataForValidate)) {
      try {
        Lesson.validationSchema.validateSync(dataForValidate)
      } catch (e) {
        const [invalidTypeMessage] = e.message.split(',')
        message.error(invalidTypeMessage)
      }
      setLoading(false)
      return
    } else {
      createDocument('lessons', form.getFieldsValue()).then(() => {
        message.success('Lesson created successfully')
        history.goBack()
      })
    }
  }

  const onReset = () => {
    form.resetFields()
    history.push('/lessons')
  }

  return { onFinish, onReset, loading }
}

export default useAdvancedFormActions
