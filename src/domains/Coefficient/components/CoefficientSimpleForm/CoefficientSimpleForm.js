import { Form, Button, Input, InputNumber } from 'antd'
import { Row, Title } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'
const CoefficientSimpleForm = (props) => {
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
      <Title level={4}>{props?.showTitle && 'Коефіцієнт'}</Title>
      <Form.Item
        label="Назва"
        name="name"
        rules={[{ required: true, message: t('Будь ласка введіть назву!') }]}
      >
        <Input
          onPressEnter={props?.onSubmit}
          autoFocus
          placeholder={t('Будь ласка введіть назву коефіцієнта!')}
        />
      </Form.Item>
      <Form.Item
        label="Код"
        name="code"
        rules={[{ required: true, message: t('Будь ласка введіть код!') }]}
      >
        <InputNumber placeholder={t('Будь ласка введіть код')} />
      </Form.Item>
      <Form.Item
        label="Оцінка"
        name="mark"
        rules={[{ required: true, message: t('Будь ласка введіть оцінку!') }]}
      >
        <InputNumber placeholder={t('Будь ласка введіть оцінку')} />
      </Form.Item>

      {!props?.form ? (
        <Form.Item>
          <Row>
            <Button type="primary">{t('Submit')}</Button>
            <Button htmlType="button" onClick={onReset}>
              {t('Reset')}
            </Button>
          </Row>
        </Form.Item>
      ) : (
        <></>
      )}
    </Form>
  )
}

CoefficientSimpleForm.propTypes = {
  form: PropTypes.object,
  initialValues: PropTypes.object,
  showTitle: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default CoefficientSimpleForm
