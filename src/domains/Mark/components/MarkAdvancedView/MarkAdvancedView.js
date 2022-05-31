import { Card } from 'antd'
import { Container, Row, Col, Text, Spin, Divider } from '@qonsoll/react-design'
import { useParams } from 'react-router-dom'
import useDocument from 'hooks/useDocument'
import PropTypes from 'prop-types'

const MarkAdvancedView = (props) => {
  const params = useParams()
  const { markId } = params
  const [mark, loading] = useDocument({ ref: `marks/${markId}` })

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
                    <Text fontWeight="bold">Lesson:</Text>
                  </Col>
                  <Col h="right">
                    <Text>{mark?.lesson}</Text>
                  </Col>
                  <Divider my="12px" />
                </Row>
                <Row>
                  <Col h="left">
                    <Text fontWeight="bold">Rating:</Text>
                  </Col>
                  <Col h="right">
                    <Text>{mark?.rating}</Text>
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

MarkAdvancedView.propTypes = {
  mark: PropTypes.object
}

export default MarkAdvancedView
