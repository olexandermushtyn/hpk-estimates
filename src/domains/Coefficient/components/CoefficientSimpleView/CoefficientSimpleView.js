import { Button, Col, Container, Row, Text, Title } from '@qonsoll/react-design'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Form } from 'antd'
import { CoefficientSimpleForm } from '../'
import PropTypes from 'prop-types'
import { useSimpleFormActions } from 'hooks'
import { useState, useEffect } from 'react'
import { CardDropdown } from 'components'
import { useTranslations } from 'contexts/Translation'

const blockSelectStyles = { userSelect: 'none', cursor: 'pointer' }

const CoefficientSimpleView = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()
  const { t } = useTranslations()

  const { handleEdit, handleCancel, handleSave, handleDelete } =
    useSimpleFormActions({
      form,
      changeStateAction: setIsEditing,
      document: props.coefficient,
      collectionName: 'coefficients'
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
                    {props.coefficient?.name}
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
                  <Text>{t('Код')}</Text>
                </Col>
                <Col h="right">
                  <Text
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="250px"
                    whiteSpace="nowrap"
                  >
                    {props.coefficient?.code}
                  </Text>
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
                  <Text>{t('Коефіцієнт')}</Text>
                </Col>
                <Col h="right">
                  <Text
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="250px"
                    whiteSpace="nowrap"
                  >
                    {props.coefficient?.mark}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              <Col justifyContent="center">
                <Row>
                  <Col>
                    <CoefficientSimpleForm
                      onSubmit={handleSave}
                      form={form}
                      initialValues={props.coefficient}
                      showTitle={false}
                    />
                  </Col>
                  <Col
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    flex={1}
                    cw={4}
                  ></Col>
                </Row>
              </Col>
            </Row>
            <Row pr={4} justifyContent="flex-end" alignItems="flex-end">
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
          </>
        )}
      </Container>
    </CardDropdown>
  )
}

CoefficientSimpleView.propTypes = {
  coefficient: PropTypes.object,
  isItemEdited: PropTypes.bool,
  setIsItemEdited: PropTypes.func
}

export default CoefficientSimpleView
