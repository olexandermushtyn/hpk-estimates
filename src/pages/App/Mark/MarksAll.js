import {
  Button,
  Col,
  Container,
  PageWrapper,
  Row,
  Spin,
  Text
} from '@qonsoll/react-design'

import { HeaderBreadcrumbs } from 'components'
import { Empty, Select, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'contexts/Translation'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'

export default function MarksAll() {
  const { t } = useTranslations()
  const history = useHistory()
  const headingProps = {
    title: t('Оцінки'),
    titleSize: 2,
    marginBottom: '16px'
  }

  const [currentSelectedGroup, setCurrentSelectedGroup] = useState(null)
  const [allLoading, setAllLoading] = useState(false)
  const [groups, loading] = useCollectionDataOnce(
    firebase.firestore().collection('groups')
  )
  const [students] = useCollectionDataOnce(
    currentSelectedGroup &&
      firebase
        .firestore()
        .collection('groups')
        .doc(currentSelectedGroup)
        .collection('students')
        .orderBy('lastName', 'asc')
  )
  const [studentsWithMarks, setStudentsWithMarks] = useState(null)

  const getAllStudentsMarks = useCallback(async () => {
    setAllLoading(true)
    const studentsWithMarks = []

    try {
      await Promise.all(
        students &&
          students.map(async (student) => {
            const studentMarks = await firebase
              .firestore()
              .collection('groups')
              .doc(currentSelectedGroup)
              .collection('students')
              .doc(student._id)
              .collection('marks')
              .get()

            const marks = []
            for (const mark of studentMarks?.docs) {
              const markData = mark.data()
              const markLesson = await firebase
                .firestore()
                .collection('lessons')
                .doc(markData.lesson)
                .get()

              marks.push({
                ...markData,
                lesson: markLesson.data()
              })

              studentsWithMarks.push({
                ...student,
                marks
              })
            }
          })
      )
    } catch (error) {
      setAllLoading(false)
    }

    setStudentsWithMarks(studentsWithMarks)
    setAllLoading(false)
  }, [currentSelectedGroup, students, setAllLoading])

  useEffect(() => {
    getAllStudentsMarks()
  }, [currentSelectedGroup, getAllStudentsMarks])

  const getColumnsByStudentLessons = useCallback(() => {
    const possibleColumns = new Set()
    studentsWithMarks &&
      studentsWithMarks.forEach((student) => {
        student.marks.forEach((mark) => {
          possibleColumns.add(mark.lesson.name)
        })
      })

    return Array.from(possibleColumns).map((column) => ({
      title: column,
      dataIndex: column,
      key: column,
      render: (text, record) => {
        const mark = record.marks.find(
          (mark) => mark.lesson.name === column
        )?.rating

        return mark ? mark : '-'
      }
    }))
  }, [studentsWithMarks])

  const columns = useMemo(
    () => [
      {
        title: t('Прізвище'),
        dataIndex: 'lastName',
        key: 'lastName'
      },
      {
        title: t('Ім’я'),
        dataIndex: 'firstName',
        key: 'firstName'
      },
      ...getColumnsByStudentLessons()
    ],
    [getColumnsByStudentLessons, t]
  )

  const onGroupChange = (value) => setCurrentSelectedGroup(value)

  return (
    <PageWrapper
      onBack={() => history?.goBack()}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}
      action={
        <Button onClick={() => history.push('/mark/create')}>
          Додати оцінку
        </Button>
      }
    >
      <Container>
        <Row noGutters>
          <Col>
            <Text>Оберіть групу</Text>
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              onChange={onGroupChange}
              loading={loading}
            >
              {groups &&
                groups?.map((group) => (
                  <Select.Option key={group._id} value={group._id}>
                    {group.name}
                  </Select.Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row noGutters marginTop="8px">
          <Col>
            {allLoading ? (
              <Spin />
            ) : studentsWithMarks?.length ? (
              <Table dataSource={studentsWithMarks} columns={columns} />
            ) : (
              <Empty description="У студентів цієї групи немає оцінок в цьому семестрі" />
            )}
          </Col>
          {/* {loading ? (
            <Col>
              <Spin />
            </Col>
          ) : (
            <Col>
              <MarkList listView={listView} marks={marks} />
            </Col>
          )} */}
        </Row>
      </Container>
    </PageWrapper>
  )
}
