import {
  Button,
  Col,
  Container,
  Divider,
  Row,
  Title
} from '@qonsoll/react-design'
import { Form, Input } from 'antd'

import { useState } from 'react'
import { StudentList } from 'domains/Student/components'
import PropTypes from 'prop-types'

const StudentListWithCreate = ({ students, setStudents }) => {
  const [isAdded, setIsAdded] = useState(false)
  const [form] = Form.useForm()

  const onAddButtonClick = () => setIsAdded(!isAdded)
  const onSaveButtonClick = () =>
    form.validateFields().then((values) => {
      setStudents((prevState) => [...prevState, values])
      form.resetFields()
      setIsAdded(false)
    })
  const onReset = () => form.resetFields()

  return (
    <Container>
      <Row>
        <Col pl="0px">
          <Title level={4}>Students</Title>
        </Col>
      </Row>
      {isAdded ? (
        <Row>
          <Col my="20px">
            <Form layout="vertical" form={form}>
              <Form.Item
                label="FirstName"
                name="firstName"
                rules={[{ required: true, message: 'Please input firstName!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="LastName"
                name="lastName"
                rules={[{ required: true, message: 'Please input lastName!' }]}
              >
                <Input />
              </Form.Item>
              <Row justifyContent="flex-end">
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
                <Button ml="24px" type="primary" onClick={onSaveButtonClick}>
                  Save
                </Button>
              </Row>
            </Form>
          </Col>
          <Divider />
        </Row>
      ) : (
        <></>
      )}
      <Col mt="12px">
        <StudentList
          isListWithCreate
          onCreateButtonClick={onAddButtonClick}
          students={students}
        />
      </Col>
    </Container>
  )
}

StudentListWithCreate.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object),
  setStudents: PropTypes.func
}

export default StudentListWithCreate
