import { MarkListWithCreate } from '../../../Mark/components'
import StudentSimpleForm from '../StudentSimpleForm'
import { Form } from 'antd'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'
import { Button, Row } from '@qonsoll/react-design'
import useAdvancedFormActions from './hooks/useAdvancedFormActions'

const StudentAdvancedForm = (props) => {
  const { t } = useTranslations()
  const [form] = Form.useForm()
  const [marks, setMarks] = useState([])

  useEffect(() => {
    if (props?.initialData) {
      const { student, marks } = props.initialData
      form.setFieldsValue(student)
      setMarks(marks)
    }
  }, [props?.initialData, form])

  const { loading, onFinish, onReset } = useAdvancedFormActions({
    initialData: props?.initialData,
    form,
    marks,
    setMarks
  })

  return (
    <Form
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          onFinish()
        }
      }}
      onFinish={onFinish}
    >
      <StudentSimpleForm showTitle={false} form={form} />
      <MarkListWithCreate marks={marks} showTitle setMarks={setMarks} />
      <Row justifyContent="flex-end">
        <Button htmlType="button" onClick={onReset}>
          {t('Cancel')}
        </Button>
        <Button
          marginLeft="24px"
          type="primary"
          loading={loading}
          onClick={onFinish}
        >
          {t('Submit')}
        </Button>
      </Row>
    </Form>
  )
}
StudentAdvancedForm.propTypes = {
  initialData: PropTypes.object
}

export default StudentAdvancedForm
