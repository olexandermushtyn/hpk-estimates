import { Button, Col, Container, Row, Text, Title } from '@qonsoll/react-design'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Form } from 'antd'
import { MarkSimpleForm } from '../'
import PropTypes from 'prop-types'
import { useSimpleFormActions } from 'hooks'
import { useState, useEffect } from 'react'
import { CardDropdown } from 'components'
import { useTranslations } from 'contexts/Translation'

const blockSelectStyles = { userSelect: 'none', cursor: 'pointer' }

const MarkSimpleView = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()
  const { t } = useTranslations()

  const { handleEdit, handleCancel, handleSave, handleDelete } =
    useSimpleFormActions({
      form,
      changeStateAction: setIsEditing,
      document: props.mark,
      collectionName: 'marks'
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
              <Row mb="18px" flex="1">
                <Col px="0px" justifyContent="center" cw={9}>
                  <Title
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="250px"
                    whiteSpace="nowrap"
                    level={5}
                  >
                    {props.mark?.lesson}
                  </Title>
                </Col>
              </Row>
              <Row
                justifyContent="center"
                alignItems="center"
                py="4px"
                borderBottom="1px solid #E7E7E7"
                mb="12px"
              >
                <Col>
                  <Text>{t('Rating')}</Text>
                </Col>
                <Col h="right">
                  <Text
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="250px"
                    whiteSpace="nowrap"
                  >
                    {props.mark?.rating}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col justifyContent="center">
              <Row>
                <Col>
                  <MarkSimpleForm
                    onSubmit={handleSave}
                    form={form}
                    initialValues={props.mark}
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

MarkSimpleView.propTypes = {
  mark: PropTypes.object,
  isItemEdited: PropTypes.bool,
  setIsItemEdited: PropTypes.func
}

export default MarkSimpleView
