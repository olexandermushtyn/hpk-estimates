import { Form, Button, Select } from 'antd'
import { Box, Text, Title } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'
import { useState } from 'react'

const MarkSimpleForm = (props) => {
  const [form] = Form.useForm()
  const { t } = useTranslations()
  const usedForm = props?.form || form

  const onReset = () => form.resetFields()

  const [groups] = useCollectionDataOnce(
    firebase.firestore().collection('groups')
  )

  const [evaluations, loadingEvaluations] = useCollectionDataOnce(
    firebase.firestore().collection('evalutaions')
  )

  const [currentSelectedGroup, setCurrentSelectedGroup] = useState(null)
  const [currentSelectedEvaluation, setCurrentSelectedEvaluation] =
    useState(null)

  const onCurrentGroupChange = (value) => setCurrentSelectedGroup(value)
  const onCurrentEvaluationChange = (value) =>
    setCurrentSelectedEvaluation(value)

  const [students, loadingStudents] = useCollectionDataOnce(
    currentSelectedGroup &&
      firebase
        .firestore()
        .collection('groups')
        .doc(currentSelectedGroup)
        .collection('students')
  )

  const [coefficients, coefficientsLoading] = useCollectionDataOnce(
    currentSelectedEvaluation &&
      firebase
        .firestore()
        .collection('evalutaions')
        .doc(currentSelectedEvaluation)
        .collection('coefficients')
        .orderBy('code')
  )

  return (
    <Form
      form={usedForm}
      layout="vertical"
      initialValues={props?.initialValues}
      style={{ marginBottom: props?.initialValues ? '-40px' : '0' }}
      autoComplete="off"
    >
      <Title level={4}>{props?.showTitle && 'Створення оцінки'}</Title>
      <Form.Item
        label="Група"
        name="group"
        rules={[{ required: true, message: 'Будь ласка оберіть групу!' }]}
      >
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
          onChange={onCurrentGroupChange}
        >
          {groups &&
            groups?.map((group) => (
              <Select.Option key={group._id} value={group._id}>
                {group.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      {currentSelectedGroup ? (
        <Form.Item
          label="Cтудент"
          name="student"
          rules={[{ required: true, message: 'Будь ласка оберіть студента!' }]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            loading={loadingStudents}
          >
            {currentSelectedGroup &&
              students?.map((student) => (
                <Select.Option key={student._id} value={student._id}>
                  {`${student.lastName} ${student.firstName}`}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      ) : (
        <Box mb="32px">
          <Text strong>Для вибору студента спочатку оберіть групу!</Text>
        </Box>
      )}
      <Form.Item
        label="Будь ласка критерій додаткового балу!"
        name="evaluation"
        rules={[
          { required: true, message: 'Будь ласка критерій додаткового балу!' }
        ]}
      >
        <Select
          onChange={onCurrentEvaluationChange}
          loading={loadingEvaluations}
        >
          {evaluations &&
            evaluations?.map((lesson) => (
              <Select.Option key={lesson._id} value={lesson._id}>
                {lesson.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      {currentSelectedEvaluation ? (
        <Form.Item
          label="Код оцінки"
          name="coefficient"
          rules={[
            { required: true, message: 'Будь ласка оберіть код оцінки!' }
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            loading={coefficientsLoading}
          >
            {currentSelectedEvaluation &&
              coefficients?.map((coefficient) => (
                <Select.Option key={coefficient._id} value={coefficient._id}>
                  {`${coefficient.code}: ${coefficient.name}`}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      ) : (
        <Box mb="32px">
          <Text strong>Для вибору коду оберіть спочатку критерій!</Text>
        </Box>
      )}

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

MarkSimpleForm.propTypes = {
  form: PropTypes.object,
  initialValues: PropTypes.object,
  showTitle: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default MarkSimpleForm
