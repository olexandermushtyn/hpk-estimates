import {
  Box,
  Col,
  Container,
  Divider,
  Row,
  Spin,
  Text
} from '@qonsoll/react-design'
import { Sticky, StickyContainer } from 'react-sticky'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import { Card } from 'antd'
import PropTypes from 'prop-types'
import StudentMarks from '../StudentMarks'
import { Tabs } from 'antd'
import useDocument from 'hooks/useDocument'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { useSemester } from 'contexts/SemesterContext'
import { useMemo } from 'react'
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

const arraysEqual = (a1, a2) => {
  return JSON.stringify(a1) === JSON.stringify(a2)
}

const EDUCATIONS_SYSTEMS = {
  BUDGET: 'Бюджет',
  CONTRACT: 'Контракт'
}

const StudentAdvancedView = (props) => {
  const params = useParams()
  const history = useHistory()
  const location = useLocation()
  const { studentId, groupId } = params
  const { currentYears, semester } = useSemester()
  const [student, loading] = useDocument({
    ref: `groups/${groupId}/students/${studentId}`
  })
  const [avgMarks, avgMarksLoading] = useCollectionDataOnce(
    groupId &&
      studentId &&
      firebase
        .firestore()
        .collection(`groups/${groupId}/students/${studentId}/avgMarks`)
  )

  const currentAvgMark = useMemo(
    () =>
      avgMarks &&
      avgMarks.find(
        (mark) =>
          arraysEqual(mark.year, currentYears) &&
          mark.semester === semester.semester
      ),
    [avgMarks, currentYears, semester]
  )

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
                    <Text fontWeight="bold">Імя:</Text>
                  </Col>
                  <Col h="right">
                    <Text>{student?.firstName}</Text>
                  </Col>
                  <Divider my="12px" />
                </Row>
                <Row>
                  <Col h="left">
                    <Text fontWeight="bold">Прізвище:</Text>
                  </Col>
                  <Col h="right">
                    <Text>{student?.lastName}</Text>
                  </Col>
                  <Divider my="12px" />
                </Row>
                <Row>
                  <Col h="left">
                    <Text fontWeight="bold">По-батькові:</Text>
                  </Col>
                  <Col h="right">
                    <Text>{student?.thirdName}</Text>
                  </Col>
                </Row>
                <Divider my="12px" />
                <Row>
                  <Col h="left">
                    <Text fontWeight="bold">Бюджет/контракт:</Text>
                  </Col>
                  <Col h="right">
                    <Text>
                      {student?.educationSystem
                        ? EDUCATIONS_SYSTEMS[student?.educationSystem]
                        : 'Дані відсутні'}
                    </Text>
                  </Col>
                </Row>
                <Divider my="12px" />
                <Row>
                  <Col h="left">
                    <Text fontWeight="bold">
                      Середня оцінка в цьому семестрі:
                    </Text>
                  </Col>
                  <Col h="right">
                    {avgMarksLoading ? (
                      <Text>Завантаження даних...</Text>
                    ) : currentAvgMark ? (
                      <Box display="flex">
                        <Text strong mr="4px">
                          {student?.averageMark}{' '}
                        </Text>
                        <Text>
                          за {student?.isTwelveSystem ? '12' : '5'} бальною
                          системою
                        </Text>
                      </Box>
                    ) : (
                      <Text>Середній бал в цьому семестрі відсутній</Text>
                    )}
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
              <TabPane tab="Додаткові бали" key="#mark">
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
