import { Button, Col, Container, Row, Title } from '@qonsoll/react-design'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Form } from 'antd'
import { LessonSimpleForm } from '../'
import PropTypes from 'prop-types'
import { useSimpleFormActions } from 'hooks'
import { useState, useEffect } from 'react'
import { CardDropdown } from 'components'

const blockSelectStyles = { userSelect: 'none', cursor: 'pointer' }

const LessonSimpleView = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()

  const { handleEdit, handleCancel, handleSave, handleDelete } =
    useSimpleFormActions({
      form,
      changeStateAction: setIsEditing,
      document: props.lesson,
      collectionName: 'lessons'
    })

  const { isItemEdited, setIsItemEdited } = props

  useEffect(() => {
    if (!isItemEdited) {
      handleCancel()
    }
  }, [handleCancel, isItemEdited])

  return (
    <CardDropdown
      handleDelete={handleDelete}
      handleEdit={() => {
        setIsItemEdited(true)
        handleEdit()
      }}
    >
      <Container style={blockSelectStyles} py="12px">
        {!isEditing ? (
          <Row py="8px" cursor="pointer">
            <Col>
              <Row flex="1">
                <Col px="0px" justifyContent="center" cw={9}>
                  <Title
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="250px"
                    whiteSpace="nowrap"
                    level={5}
                  >
                    {props.lesson?.name}
                  </Title>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col justifyContent="center">
              <Row>
                <Col>
                  <LessonSimpleForm
                    onSubmit={handleSave}
                    form={form}
                    initialValues={props.lesson}
                    showTitle={false}
                  />
                </Col>
                <Col
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  flex={1}
                  cw={4}
                >
                  <Row justifyContent="flex-end" alignItems="flex-end">
                    <Button
                      ghost
                      onClick={handleCancel}
                      shape="circle"
                      type="primary"
                      icon={<CloseOutlined />}
                    />
                    <Button
                      ml="8px"
                      shape="circle"
                      type="primary"
                      onClick={handleSave}
                      icon={<CheckOutlined />}
                    />
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </CardDropdown>
  )
}

LessonSimpleView.propTypes = {
  lesson: PropTypes.object,
  isItemEdited: PropTypes.bool,
  setIsItemEdited: PropTypes.func
}

export default LessonSimpleView
