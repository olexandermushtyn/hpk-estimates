import {
  Button,
  Col,
  Container,
  Divider,
  Row,
  Title
} from '@qonsoll/react-design'
import { Form, Input, InputNumber } from 'antd'

import { useState } from 'react'
import { MarkList } from 'domains/Mark/components'
import PropTypes from 'prop-types'

const MarkListWithCreate = ({ marks, setMarks }) => {
  const [isAdded, setIsAdded] = useState(false)
  const [form] = Form.useForm()

  const onAddButtonClick = () => setIsAdded(!isAdded)
  const onSaveButtonClick = () =>
    form.validateFields().then((values) => {
      setMarks((prevState) => [...prevState, values])
      form.resetFields()
      setIsAdded(false)
    })
  const onReset = () => form.resetFields()

  return (
    <Container>
      <Row>
        <Col pl="0px">
          <Title level={4}>Оцінки</Title>
        </Col>
      </Row>
      {isAdded ? (
        <Row noGutters>
          <Col my="20px">
            <Form layout="vertical" form={form}>
              <Form.Item
                label="Lesson"
                name="lesson"
                rules={[{ required: true, message: 'Please input lesson!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Rating"
                name="rating"
                rules={[{ required: true, message: 'Please input rating!' }]}
              >
                <InputNumber />
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
      <Col noGutters mt="12px">
        <MarkList
          isListWithCreate
          onCreateButtonClick={onAddButtonClick}
          marks={marks}
        />
      </Col>
    </Container>
  )
}

MarkListWithCreate.propTypes = {
  marks: PropTypes.arrayOf(PropTypes.object),
  setMarks: PropTypes.func
}

export default MarkListWithCreate
