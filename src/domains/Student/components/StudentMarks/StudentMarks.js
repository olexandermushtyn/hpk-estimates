import { Container, Row, Col, Text } from '@qonsoll/react-design'
import { MarkList } from '../../../Mark/components'
import { useStudentMarks } from '../../hooks'
import PropTypes from 'prop-types'

export default function StudentMarks(props) {
  const [marks, loading, error] = useStudentMarks(props.student)
  return (
    <Container>
      <Row noGutters>
        {loading ? (
          <Col>
            <Text>Loading...</Text>
          </Col>
        ) : null}
        {!loading && marks?.length ? (
          <Col>
            <MarkList hideAddCard marks={marks} />
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

StudentMarks.propTypes = {
  student: PropTypes.object.isRequired
}
