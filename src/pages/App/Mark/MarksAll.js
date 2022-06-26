import {
  Button,
  Col,
  Container,
  PageWrapper,
  Row,
  Spin,
  Text,
  Title
} from '@qonsoll/react-design'

import { HeaderBreadcrumbs } from 'components'
import { Empty, Select, Table } from 'antd'
import { useHistory } from 'react-router-dom'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'contexts/Translation'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'
import { useSemester } from 'contexts/SemesterContext'
import { MarksTable } from 'components'
import { useStudentCurrentAvgMark } from '../../../domains/Student/hooks'

const chairsMap = {
  ПІ: 'Програмна інженерія',
  КІ: 'Комп’ютерна інженерія',
  АТ: 'Автомобільний транспорт',
  МЄ: 'Менеджмент',
  ЕК: 'Економіка',
  ПМ: 'Прикладна механіка',
  МГ: 'Галузеве машинобудування'
}

const getAvgSuccess = (averageMark, isTwelveSystem) => {
  if (!averageMark || !isTwelveSystem) {
    return '-'
  } else {
    return isTwelveSystem ? averageMark * 7.5 : averageMark * 18
  }
}

const coursesNumber = {
  Перший: 1,
  Другий: 2,
  Третій: 3,
  Четвертий: 4
}

export default function MarksAll() {
  const { t } = useTranslations()
  const history = useHistory()
  const headingProps = {
    title: t('Оцінки'),
    titleSize: 2,
    marginBottom: '16px'
  }

  const [currentSelectedChair, setCurrentSelectedChair] = useState(null)
  const [currentSelectedCourse, setCurrentSelectedCourse] = useState(null)
  const [suitableStudents, setSuitableStudents] = useState([])
  const { semester } = useSemester()
  const [groups, loading] = useCollectionDataOnce(
    firebase.firestore().collection('groups').orderBy('name', 'asc')
  )
  const [transofrmationLoading, setTransofrmationLoading] = useState(false)
  const getStudentAvgMark = useStudentCurrentAvgMark()

  const currentYear = useMemo(() => {
    const year = semester.year[1].year()
    return year.toString().substring(2, 4)
  }, [semester])

  const groupsWithCurrentChairAndCourse = useMemo(() => {
    if (!groups) return []
    return groups.filter((group) => {
      const groupYear = group.name.substring(3, 5)
      const isCurrentCourse = currentYear - groupYear === currentSelectedCourse
      const isCurrentSelectedChair = group.name.includes(currentSelectedChair)
      return isCurrentCourse && isCurrentSelectedChair
    })
  }, [groups, currentYear, currentSelectedCourse, currentSelectedChair])

  const allStudentsFromSuitableGroups = useCallback(async () => {
    setTransofrmationLoading(true)
    const computedStudents = []
    if (!groupsWithCurrentChairAndCourse.length) return
    else {
      for (const group of groupsWithCurrentChairAndCourse) {
        const data = []
        const students = await firebase
          .firestore()
          .collection('groups')
          .doc(group._id)
          .collection('students')
          .get()
        for (const student of students.docs) {
          const currentAvgMark = await getStudentAvgMark(
            group._id,
            student.data()._id
          )
          const { averageMark, isTwelveSystem } = currentAvgMark ?? {}
          const avgSuccess = getAvgSuccess(averageMark, isTwelveSystem)

          data.push({
            ...student.data(),
            group: group.name,
            groupId: group._id,
            avgMark: averageMark ? averageMark : '-',
            success: avgSuccess
          })
        }
        computedStudents.push(...data)
      }
      setSuitableStudents(computedStudents)
      setTransofrmationLoading(false)
    }
  }, [getStudentAvgMark, groupsWithCurrentChairAndCourse])

  const transformedStudents = useMemo(() => {
    const data = []
    let index = 0
    for (const student of suitableStudents) {
      data.push({
        ...student,
        index: index + 1,
        pib:
          student.firstName + ' ' + student.lastName + ' ' + student.thirdName
      })
      index += 1
    }

    return data
  }, [suitableStudents])

  useEffect(() => {
    allStudentsFromSuitableGroups()
  }, [allStudentsFromSuitableGroups])

  const onGroupChange = (value) => setCurrentSelectedChair(value)
  const onCourseChange = (value) => setCurrentSelectedCourse(value)

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
            <Text>Оберіть відділення</Text>
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              onChange={onGroupChange}
              loading={loading}
            >
              {Object.keys(chairsMap) &&
                Object.keys(chairsMap)?.map((chair) => (
                  <Select.Option key={chair} value={chair}>
                    {chairsMap[chair]}
                  </Select.Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row noGutters>
          <Col>
            <Text>Оберіть курс</Text>
            <Select
              optionFilterProp="children"
              onChange={onCourseChange}
              loading={loading}
            >
              {Object.keys(coursesNumber)?.map((course) => (
                <Select.Option key={course} value={coursesNumber[course]}>
                  {course}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row noGutters marginTop="8px">
          <Col>
            {!currentSelectedChair || !currentSelectedCourse ? (
              <Row mt="48px">
                <Col h="center">
                  <Title>Оберіть відділення і курс</Title>
                </Col>
              </Row>
            ) : (
              <Row noGutters>
                <Col>
                  {transofrmationLoading ? (
                    <Spin />
                  ) : (
                    <MarksTable data={transformedStudents} />
                  )}
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  )
}
