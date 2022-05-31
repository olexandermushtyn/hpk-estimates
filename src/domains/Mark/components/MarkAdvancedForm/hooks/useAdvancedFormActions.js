import { createDocument } from 'services/firestore'

import { Mark } from 'models'
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
    if (!Mark.validationSchema.isValidSync(dataForValidate)) {
      try {
        Mark.validationSchema.validateSync(dataForValidate)
      } catch (e) {
        const [invalidTypeMessage] = e.message.split(',')
        message.error(invalidTypeMessage)
      }
      setLoading(false)
      return
    } else {
      createDocument('marks', form.getFieldsValue()).then(() => {
        message.success('Mark created successfully')
        history.goBack()
      })
    }
  }

  const onReset = () => {
    form.resetFields()
    history.push('/marks')
  }

  return { onFinish, onReset, loading }
}

export default useAdvancedFormActions
