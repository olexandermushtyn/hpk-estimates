import { Tabs } from 'antd'
import { StickyContainer, Sticky } from 'react-sticky'
import { Card } from 'antd'
import { Container, Row, Col, Text, Spin, Divider } from '@qonsoll/react-design'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import EvaluationCoefficients from '../EvaluationCoefficients'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'

const TabPane = Tabs.TabPane

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="site-custom-tab-bar"
        style={{ ...style, zIndex: 1000, backgroundColor: '#faf8ff' }}
      />
    )}
  </Sticky>
)

const EvaluationAdvancedView = (props) => {
  const params = useParams()
  const history = useHistory()
  const location = useLocation()
  const { evaluationId } = params
  const [evaluation, loading] = useDocumentDataOnce(
    evaluationId &&
      firebase.firestore().collection('evalutaions').doc(evaluationId)
  )

  const changeTab = (key) => {
    if (params) {
      const urlContext = evaluationId && `/evaluations/${evaluationId}`
      history.push(`${urlContext}${key}`)
    }
  }

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
                    <Text fontWeight="bold">Назва:</Text>
                  </Col>
                  <Col h="right">
                    <Text>{evaluation?.name}</Text>
                  </Col>
                </Row>
                <Divider my="12px" />
              </Card>
            </Col>
          </Row>
        </Container>
      )}
      <Row mt="24px">
        <Col>
          <StickyContainer>
            <Tabs
              defaultActiveKey={location.hash}
              onChange={changeTab}
              renderTabBar={renderTabBar}
            >
              <TabPane tab="Коефіцієнти" key="#coefficient">
                <EvaluationCoefficients evaluation={evaluation?._id} />
              </TabPane>
            </Tabs>
          </StickyContainer>
        </Col>
      </Row>
    </Container>
  )
}

EvaluationAdvancedView.propTypes = {
  evaluation: PropTypes.object
}

export default EvaluationAdvancedView
