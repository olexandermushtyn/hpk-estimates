import LessonSimpleForm from '../LessonSimpleForm'
import { Form } from 'antd'
import { useTranslations } from 'contexts/Translation'
import { Button, Row } from '@qonsoll/react-design'
import useAdvancedFormActions from './hooks/useAdvancedFormActions'

const LessonAdvancedForm = (props) => {
  const { t } = useTranslations()
  const [form] = Form.useForm()

  const { loading, onFinish, onReset } = useAdvancedFormActions({
    form
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
      <LessonSimpleForm showTitle={false} form={form} />
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

export default LessonAdvancedForm
