import StudentSimpleForm from '../StudentSimpleForm'
import { Form, InputNumber, Select, Switch } from 'antd'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'
import { Box, Button, Col, Row, Text } from '@qonsoll/react-design'
import useAdvancedFormActions from './hooks/useAdvancedFormActions'

const EDUCATIONS_SYSTEMS = {
  BUDGET: 'Бюджет',
  CONTRACT: 'Контракт'
}

const { Option } = Select

const StudentAdvancedForm = (props) => {
  const { t } = useTranslations()
  const [form] = Form.useForm()
  const [marks, setMarks] = useState([])
  const [isTwelveSystem, setIsTwelveSystem] = useState(false)
  const [educationSystem, setEducationSystem] = useState('BUDGET')

  useEffect(() => {
    if (props?.initialData) {
      const { student, marks, isTwelveSystem, educationSystem } =
        props.initialData
      form.setFieldsValue(student)
      setMarks(marks)
      setIsTwelveSystem(isTwelveSystem)
      setEducationSystem(educationSystem)
    }
  }, [props?.initialData, form])

  const { loading, onFinish, onReset } = useAdvancedFormActions({
    initialData: props?.initialData,
    form,
    marks,
    setMarks
  })

  const handleChange = (value) => setEducationSystem(value)

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
      <Row noGutters>
        <Col>
          <Form layout="vertical" form={form}>
            <Form.Item
              style={{ marginBottom: '0px' }}
              valuePropName="checked"
              label="Система оцінювання"
              rules={[
                {
                  required: true,
                  message: t(
                    'Будь ласка введіть середній бал студента в цьому семестрі!'
                  )
                }
              ]}
              name="isTwelveSystem"
            >
              <Switch
                checked={isTwelveSystem}
                onChange={() => setIsTwelveSystem(!isTwelveSystem)}
              />
            </Form.Item>
            <Box mb="24px">
              <Text strong fontSize="14px">
                {isTwelveSystem ? '12' : '5'} - бальна система
              </Text>
            </Box>
            <Form.Item
              label="Середній семестровий бал"
              rules={[
                {
                  required: true,
                  message: t(
                    'Будь ласка введіть середній бал студента в цьому семестрі!'
                  )
                }
              ]}
              name="averageMark"
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Бюджет/контракт"
              rules={[
                {
                  required: true,
                  message: t('Будь ласка оберіть бюджет/контракт!')
                }
              ]}
              name="educationSystem"
            >
              <Select value={educationSystem} onChange={handleChange}>
                {Object.keys(EDUCATIONS_SYSTEMS).map((key) => (
                  <Option key={key} value={key}>
                    {EDUCATIONS_SYSTEMS[key]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justifyContent="flex-end">
        <Button htmlType="button" onClick={onReset}>
          {t('Відмінити')}
        </Button>
        <Button
          marginLeft="24px"
          type="primary"
          loading={loading}
          onClick={onFinish}
        >
          {t('Зберегти')}
        </Button>
      </Row>
    </Form>
  )
}
StudentAdvancedForm.propTypes = {
  initialData: PropTypes.object
}

export default StudentAdvancedForm
