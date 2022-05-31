import {
  PageWrapper,
  Container,
  Row,
  Col,
  Spin,
  Popover,
  Button
} from '@qonsoll/react-design'
import { LessonList, LessonSortMenu } from 'domains/Lesson/components'
import { HeaderBreadcrumbs } from 'components'
import { useLessons } from 'domains/Lesson/hooks'
import { useHistory } from 'react-router-dom'
import { Tooltip } from 'antd'
import {
  UnorderedListOutlined,
  SortAscendingOutlined,
  AppstoreOutlined
} from '@ant-design/icons'
import { useState } from 'react'

export default function LessonsAll() {
  const history = useHistory()
  const [listView, setListView] = useState(false)
  const [filterData, setFilterData] = useState({})
  const headingProps = {
    title: 'Предмети',
    titleSize: 2,
    marginBottom: '16px'
  }
  const [lessons, loading] = useLessons(filterData)

  return (
    <PageWrapper
      action={
        lessons?.length > 0 && (
          <Row noGutters>
            <Col cw="auto">
              <Tooltip title="Change list view">
                <Button
                  onClick={() => setListView(!listView)}
                  icon={
                    listView ? <AppstoreOutlined /> : <UnorderedListOutlined />
                  }
                />
              </Tooltip>
            </Col>
            <Col ml="8px" cw="auto">
              <Tooltip title="Open sort menu">
                <Popover
                  content={
                    <LessonSortMenu
                      filteredData={filterData}
                      setFilteredData={setFilterData}
                    />
                  }
                  trigger="click"
                >
                  <Button icon={<SortAscendingOutlined />} />
                </Popover>
              </Tooltip>
            </Col>
          </Row>
        )
      }
      onBack={() => history?.goBack()}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}
    >
      <Container>
        <Row noGutters marginTop="8px">
          {loading ? (
            <Col>
              <Spin />
            </Col>
          ) : (
            <Col>
              <LessonList listView={listView} lessons={lessons} />
            </Col>
          )}
        </Row>
      </Container>
    </PageWrapper>
  )
}
