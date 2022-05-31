import {
  AppstoreOutlined,
  FilterFilled,
  FilterOutlined,
  SortAscendingOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'
import {
  Button,
  Col,
  Container,
  PageWrapper,
  Popover,
  Row,
  Spin
} from '@qonsoll/react-design'
import {
  StudentFilter,
  StudentList,
  StudentSortMenu
} from 'domains/Student/components'
import { useMemo, useState } from 'react'
import { HeaderBreadcrumbs } from 'components'
import { Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'
import { useStudents } from 'domains/Student/hooks'

export default function StudentsAll() {
  const history = useHistory()
  const [listView, setListView] = useState(false)
  const [filterVisibility, setFilterVisibility] = useState(true)
  const [filterData, setFilterData] = useState({})
  const headingProps = {
    title: 'Cтуденти',
    titleSize: 2,
    marginBottom: '16px'
  }
  const [students, loading] = useStudents(filterData)

  const filterButtonText = useMemo(
    () => (filterVisibility ? 'Hide filter' : 'Show filter'),
    [filterVisibility]
  )
  const filterButtonIcon = useMemo(
    () => (filterVisibility ? <FilterOutlined /> : <FilterFilled />),
    [filterVisibility]
  )
  const onFilterButtonClick = () => setFilterVisibility(!filterVisibility)

  const showFilter = useMemo(() => {
    if (filterData?.where?.length > 0) {
      return true
    } else {
      return students?.length > 0
    }
  }, [filterData?.where?.length, students?.length])

  return (
    <PageWrapper
      action={
        <Row noGutters>
          {students?.length > 0 && (
            <>
              <Col cw="auto">
                <Tooltip title="Change list view">
                  <Button
                    onClick={() => setListView(!listView)}
                    icon={
                      listView ? (
                        <AppstoreOutlined />
                      ) : (
                        <UnorderedListOutlined />
                      )
                    }
                  />
                </Tooltip>
              </Col>
              <Col ml="8px" cw="auto">
                <Tooltip title="Open sort menu">
                  <Popover
                    content={
                      <StudentSortMenu
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
            </>
          )}
        </Row>
      }
      onBack={() => history?.goBack()}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}
    >
      <Container>
        {showFilter && (
          <Row noGutters>
            <Col cw="auto">
              <Button
                onClick={onFilterButtonClick}
                icon={filterButtonIcon}
                type="text"
                size="small"
              >
                {filterButtonText}
              </Button>
            </Col>
          </Row>
        )}
        <Row noGutters marginTop="8px">
          <Col mr={filterVisibility && '16px'} cw="auto">
            {showFilter && (
              <StudentFilter
                filterVisibility={filterVisibility}
                setFilterVisibility={setFilterVisibility}
                filterData={filterData}
                setFilterData={setFilterData}
              />
            )}
          </Col>
          {loading ? (
            <Col>
              <Spin />
            </Col>
          ) : (
            <Col>
              <StudentList listView={listView} students={students} />
            </Col>
          )}
        </Row>
      </Container>
    </PageWrapper>
  )
}
