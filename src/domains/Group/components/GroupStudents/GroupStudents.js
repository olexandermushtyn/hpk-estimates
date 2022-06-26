import { Container, Row, Col, Text } from '@qonsoll/react-design'
import { StudentList } from '../../../Student/components'
import { useGroupStudents } from '../../hooks'
import PropTypes from 'prop-types'

export default function GroupStudents(props) {
  const [students, loading, error] = useGroupStudents(props.group)

  return (
    <Container>
      <Row noGutters>
        {loading ? (
          <Col>
            <Text>Loading...</Text>
          </Col>
        ) : null}
        {!loading && students?.length ? (
          <Col>
            <StudentList hideAddCard loading={loading} students={students} />
          </Col>
        ) : null}
        {error ? (
          <Col>
            <Text>{JSON.stringify(error)}</Text>
          </Col>
        ) : null}
      </Row>
    </Container>
  )
}

GroupStudents.propTypes = {
  group: PropTypes.object.isRequired
}
