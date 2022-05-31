import { PageWrapper, Container, Row, Col, Spin } from '@qonsoll/react-design'
import { LessonAdvancedForm } from 'domains/Lesson/components'
import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDocument } from 'hooks'
import {} from 'domains/Lesson/hooks'

export default function LessonEdit() {
  const { t } = useTranslations()
  const history = useHistory()
  const headingProps = {
    title: t('Edit lesson'),
    titleSize: 2,
    marginBottom: '16px'
  }
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const { lessonId } = params

  const [lesson] = useDocument({ ref: `lessons/${lessonId}` })

  useEffect(() => {
    lesson && setLoading(false)
  }, [lesson])

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
              <LessonAdvancedForm initialData={{ lesson }} />
            </Col>
          )}
        </Row>
      </Container>
    </PageWrapper>
  )
}
