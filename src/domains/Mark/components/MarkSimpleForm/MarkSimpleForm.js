import { Form, Button, InputNumber, Select } from 'antd'
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

  const [lessons, loadingLessons] = useCollectionDataOnce(
    firebase.firestore().collection('lessons')
  )

  const [currentSelectedGroup, setCurrentSelectedGroup] = useState(null)

  const onCurrentGroupChange = (value) => setCurrentSelectedGroup(value)

  const [students, loadingStudents] = useCollectionDataOnce(
    currentSelectedGroup &&
      firebase
        .firestore()
        .collection('groups')
        .doc(currentSelectedGroup)
        .collection('students')
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
        label="Предмет"
        name="lesson"
        rules={[{ required: true, message: 'Будь ласка обреріть предемет!' }]}
      >
        <Select loading={loadingLessons}>
          {lessons &&
            lessons?.map((lesson) => (
              <Select.Option key={lesson._id} value={lesson._id}>
                {lesson.name}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Оцінка"
        name="rating"
        rules={[{ required: true, message: 'Будь ласка введіть оцінку!' }]}
      >
        <InputNumber placeholder={'Будь ласка введіть оцінку'} />
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

MarkSimpleForm.propTypes = {
  form: PropTypes.object,
  initialValues: PropTypes.object,
  showTitle: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default MarkSimpleForm
