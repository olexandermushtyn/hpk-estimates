import { Card } from 'antd'
import { Container, Row, Col, Text, Spin } from '@qonsoll/react-design'
import { useParams } from 'react-router-dom'
import useDocument from 'hooks/useDocument'
import PropTypes from 'prop-types'

const LessonAdvancedView = (props) => {
  const params = useParams()
  const { lessonId } = params
  const [lesson, loading] = useDocument({ ref: `lessons/${lessonId}` })

  return (
    <Container>
      {loading ? (
        <Spin />
      ) : (
        <Container>
          <Row>
            <Col>
              <Card>
                <Row>
                  <Col h="left">
                    <Text fontWeight="bold">Name:</Text>
                  </Col>
                  <Col h="right">
                    <Text>{lesson?.name}</Text>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  )
}

LessonAdvancedView.propTypes = {
  lesson: PropTypes.object
}

export default LessonAdvancedView
