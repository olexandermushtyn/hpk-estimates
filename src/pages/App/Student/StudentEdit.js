import { PageWrapper, Container, Row, Col, Spin } from '@qonsoll/react-design'
import { StudentAdvancedForm } from 'domains/Student/components'
import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDocument } from 'hooks'
import { useStudentMarks } from 'domains/Student/hooks'

export default function StudentEdit() {
  const { t } = useTranslations()
  const history = useHistory()
  const headingProps = {
    title: t('Edit student'),
    titleSize: 2,
    marginBottom: '16px'
  }
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const { studentId } = params

  const [student] = useDocument({ ref: `students/${studentId}` })
  const [marks] = useStudentMarks(student)

  useEffect(() => {
    student && marks && setLoading(false)
  }, [student, marks])

  return (
    <PageWrapper
      onBack={() => history?.goBack()}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}
    >
      <Container bounded xl>
        <Row noGutters marginTop="8px">
          {loading ? (
            <Col>
              <Spin />
            </Col>
          ) : (
            <Col>
              <StudentAdvancedForm initialData={{ student, marks }} />
            </Col>
          )}
        </Row>
      </Container>
    </PageWrapper>
  )
}
