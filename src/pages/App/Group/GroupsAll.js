import {
  AppstoreOutlined,
  FilterFilled,
  FilterOutlined,
  SortAscendingOutlined,
  TableOutlined,
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
import { GroupFilter, GroupList, GroupSortMenu } from 'domains/Group/components'
import { useMemo, useState } from 'react'

import { HeaderBreadcrumbs } from 'components'
import { Tooltip } from 'antd'
import { useGroups } from 'domains/Group/hooks'
import { useHistory } from 'react-router-dom'
import { UploadModal } from '../Student/components'

export default function GroupsAll() {
  const history = useHistory()
  const [listView, setListView] = useState(false)
  const [filterVisibility, setFilterVisibility] = useState(true)
  const [filterData, setFilterData] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }
  const headingProps = {
    title: 'Групи',
    titleSize: 2,
    marginBottom: '16px'
  }
  const [groups, loading] = useGroups(filterData)

  const filterButtonText = useMemo(
    () => (filterVisibility ? 'Сховати фільтр' : 'Показати фільтр'),
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
      return groups?.length > 0
    }
  }, [filterData?.where?.length, groups?.length])

  return (
    <PageWrapper
      action={
        <Row noGutters>
          {groups?.length > 0 && (
            <>
              <Col cw="auto">
                <Tooltip title="Змінити вигляд списку">
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
                <Tooltip title="Відкрити меню сортування">
                  <Popover
                    content={
                      <GroupSortMenu
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
          <Col ml="8px" cw="auto">
            <Tooltip title="Імпортувати данні з Excel">
              <Button onClick={showModal} icon={<TableOutlined />} />
              <UploadModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
              />
            </Tooltip>
          </Col>
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
              <GroupFilter
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
              <GroupList listView={listView} groups={groups} />
            </Col>
          )}
        </Row>
      </Container>
    </PageWrapper>
  )
}
