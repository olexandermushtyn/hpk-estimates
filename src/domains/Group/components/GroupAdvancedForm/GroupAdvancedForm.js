import { StudentListWithCreate } from '../../../Student/components'
import GroupSimpleForm from '../GroupSimpleForm'
import { Form } from 'antd'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'
import { Button, Row } from '@qonsoll/react-design'
import useAdvancedFormActions from './hooks/useAdvancedFormActions'

const GroupAdvancedForm = (props) => {
  const { t } = useTranslations()
  const [form] = Form.useForm()
  const [students, setStudents] = useState([])

  useEffect(() => {
    if (props?.initialData) {
      const { group, students } = props.initialData
      form.setFieldsValue(group)
      setStudents(students)
    }
  }, [props?.initialData, form])

  const { loading, onFinish, onReset } = useAdvancedFormActions({
    initialData: props?.initialData,
    form,
    students,
    setStudents
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
      <GroupSimpleForm showTitle={false} form={form} />
      <StudentListWithCreate
        students={students}
        showTitle
        setStudents={setStudents}
      />
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
GroupAdvancedForm.propTypes = {
  initialData: PropTypes.object
}

export default GroupAdvancedForm
