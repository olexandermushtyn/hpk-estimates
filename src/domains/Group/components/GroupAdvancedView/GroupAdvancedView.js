import { Col, Container, Divider, Row, Spin, Text } from '@qonsoll/react-design'
import { Sticky, StickyContainer } from 'react-sticky'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { Card } from 'antd'
import GroupStudents from '../GroupStudents'
import PropTypes from 'prop-types'
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

const GroupAdvancedView = (props) => {
  const params = useParams()
  const history = useHistory()
  const location = useLocation()
  const { groupId } = params
  const [group, loading] = useDocument({ ref: `groups/${groupId}` })
  const changeTab = (key) => {
    if (params) {
      const urlContext = groupId && `/groups/${groupId}`
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
                    <Text>{group?.name}</Text>
                  </Col>
                </Row>
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
              <TabPane tab="Студенти" key="#student">
                <GroupStudents group={groupId} />
              </TabPane>
            </Tabs>
          </StickyContainer>
        </Col>
      </Row>
    </Container>
  )
}

GroupAdvancedView.propTypes = {
  group: PropTypes.object
}

export default GroupAdvancedView
