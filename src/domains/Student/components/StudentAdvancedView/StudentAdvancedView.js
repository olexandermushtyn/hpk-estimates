import { Col, Container, Divider, Row, Spin, Text } from '@qonsoll/react-design'
import { Sticky, StickyContainer } from 'react-sticky'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { Card } from 'antd'
import PropTypes from 'prop-types'
import StudentMarks from '../StudentMarks'
import { Tabs } from 'antd'
import useDocument from 'hooks/useDocument'
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

const StudentAdvancedView = (props) => {
  const params = useParams()
  const history = useHistory()
  const location = useLocation()
  const { studentId } = params
  const [student, loading] = useDocument({ ref: `students/${studentId}` })

  const changeTab = (key) => {
    if (params) {
      const urlContext = studentId && `/students/${studentId}`
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
                    <Text fontWeight="bold">FirstName:</Text>
                  </Col>
                  <Col h="right">
                    <Text>{student?.firstName}</Text>
                  </Col>
                  <Divider my="12px" />
                </Row>
                <Row>
                  <Col h="left">
                    <Text fontWeight="bold">LastName:</Text>
                  </Col>
                  <Col h="right">
                    <Text>{student?.lastName}</Text>
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
              <TabPane tab="Marks" key="#mark">
                <StudentMarks student={student} />
              </TabPane>
            </Tabs>
          </StickyContainer>
        </Col>
      </Row>
    </Container>
  )
}

StudentAdvancedView.propTypes = {
  student: PropTypes.object
}

export default StudentAdvancedView
