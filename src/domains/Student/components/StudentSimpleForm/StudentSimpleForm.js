import { Form, Button, Input } from 'antd'
import { Title } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'
const StudentSimpleForm = (props) => {
  const [form] = Form.useForm()
  const { t } = useTranslations()
  const usedForm = props?.form || form

  const onReset = () => form.resetFields()

  return (
    <Form
      form={usedForm}
      layout="vertical"
      initialValues={props?.initialValues}
      style={{ marginBottom: props?.initialValues ? '-40px' : '0' }}
      autoComplete="off"
    >
      <Title level={4}>{props?.showTitle && 'Student'}</Title>
      <Form.Item
        label="FirstName"
        name="firstName"
        rules={[{ required: true, message: t('Please enter your firstName!') }]}
      >
        <Input
          onPressEnter={props?.onSubmit}
          autoFocus
          placeholder={t('Please enter your student firstName')}
        />
      </Form.Item>
      <Form.Item
        label="LastName"
        name="lastName"
        rules={[{ required: true, message: t('Please enter your lastName!') }]}
      >
        <Input placeholder={t('Please enter your student lastName')} />
      </Form.Item>

      {!props?.form ? (
        <Form.Item>
          <Button type="primary">{t('Submit')}</Button>
          <Button htmlType="button" onClick={onReset}>
            {t('Reset')}
          </Button>
        </Form.Item>
      ) : (
        <></>
      )}
    </Form>
  )
}

StudentSimpleForm.propTypes = {
  form: PropTypes.object,
  initialValues: PropTypes.object,
  showTitle: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default StudentSimpleForm
