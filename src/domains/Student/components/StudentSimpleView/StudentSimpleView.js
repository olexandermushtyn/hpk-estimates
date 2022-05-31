import { Col, Container, Row, Text } from '@qonsoll/react-design'
import PropTypes from 'prop-types'
import { useSimpleFormActions } from 'hooks'
import { CardDropdown } from 'components'
import { useHistory } from 'react-router-dom'

const blockSelectStyles = { userSelect: 'none', cursor: 'pointer' }

const StudentSimpleView = (props) => {
  const history = useHistory()

  const { handleDelete } = useSimpleFormActions({
    document: props.student,
    collectionName: 'students'
  })

  const handleEdit = () => history.push(`/students/${props.student?._id}/edit`)
  const handleOpen = () => history.push(`/students/${props.student?._id}`)

  return (
    <CardDropdown handleDelete={handleDelete} handleEdit={handleEdit}>
      <Container style={blockSelectStyles} onDoubleClick={handleOpen}>
        <Row py="8px">
          <Col>
            <Row justifyContent="center" alignItems="center">
              <Col h="left">
                <Text
                  fontSize="16px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  maxWidth="250px"
                  whiteSpace="nowrap"
                >
                  {props?.student?.firstName + ' '}
                  {props.student?.lastName}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </CardDropdown>
  )
}

StudentSimpleView.propTypes = {
  student: PropTypes.object
}

export default StudentSimpleView
