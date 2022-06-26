import { Form, Button, Input } from 'antd'
import { Title } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'
const EvaluationSimpleForm = (props) => {
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
      <Title level={4}>{props?.showTitle && 'Evaluation'}</Title>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: t('Please enter your name!') }]}
      >
        <Input
          onPressEnter={props?.onSubmit}
          autoFocus
          placeholder={t('Please enter your evaluation name')}
        />
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

EvaluationSimpleForm.propTypes = {
  form: PropTypes.object,
  initialValues: PropTypes.object,
  showTitle: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default EvaluationSimpleForm
