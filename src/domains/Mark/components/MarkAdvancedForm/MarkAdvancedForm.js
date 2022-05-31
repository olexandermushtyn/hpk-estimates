import MarkSimpleForm from '../MarkSimpleForm'
import { Form } from 'antd'
import { Button, Row } from '@qonsoll/react-design'
import useAdvancedFormActions from './hooks/useAdvancedFormActions'
import { useSemester } from 'contexts/SemesterContext'
import firebase from 'firebase/compat/app'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const MarkAdvancedForm = (props) => {
  const [form] = Form.useForm()
  const { semester } = useSemester()
  const [loading, setLoading] = useState(false)
  const { onReset } = useAdvancedFormActions({})
  const history = useHistory()

  const onFinish = async () => {
    setLoading(true)
    const values = form.getFieldValue()
    const { group, student } = values
    const mark = {
      ...values,
      year: semester?.year.map((year) => year.year()),
      semester: semester.semester
    }

    const newMarkId = await firebase
      .firestore()
      .collection('groups')
      .doc(group)
      .collection('students')
      .doc(student)
      .collection('marks')
      .doc().id

    await firebase
      .firestore()
      .collection('groups')
      .doc(group)
      .collection('students')
      .doc(student)
      .collection('marks')
      .doc(newMarkId)
      .set(mark)

    setLoading(false)

    history.push('/marks')
  }

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
      <MarkSimpleForm showTitle={false} form={form} />
      <Row justifyContent="flex-end">
        <Button htmlType="button" onClick={onReset}>
          {'Відмінити'}
        </Button>
        <Button
          marginLeft="24px"
          type="primary"
          loading={loading}
          onClick={onFinish}
        >
          {'Зберегти'}
        </Button>
      </Row>
    </Form>
  )
}

export default MarkAdvancedForm
