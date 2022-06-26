import { Col, Container, Row, Title } from '@qonsoll/react-design'
import { useSimpleFormActions } from 'hooks'
import { CardDropdown } from 'components'
import { useHistory } from 'react-router-dom'

const blockSelectStyles = { userSelect: 'none', cursor: 'pointer' }

const StatusSimpleView = (props) => {
  const history = useHistory()

  const { handleDelete } = useSimpleFormActions({
    document: props.status,
    collectionName: 'statuses'
  })

  const handleEdit = () => history.push(`/statuses/${props.status?._id}/edit`)
  const handleOpen = () => history.push(`/statuses/${props.status?._id}`)

  return (
    <CardDropdown handleDelete={handleDelete} handleEdit={handleEdit}>
      <Container style={blockSelectStyles} onDoubleClick={handleOpen} py="12px">
        <Row py="8px">
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
                  {props.status?.name}
                </Title>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </CardDropdown>
  )
}

export default StatusSimpleView
