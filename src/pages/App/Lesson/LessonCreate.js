import { PageWrapper, Container, Row, Col } from '@qonsoll/react-design'
import { LessonAdvancedForm } from 'domains/Lesson/components'
import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { useHistory } from 'react-router-dom'

export default function LessonCreate() {
  const { t } = useTranslations()
  const history = useHistory()
  const headingProps = {
    title: t('Create lesson'),
    titleSize: 2,
    marginBottom: '16px'
  }

  return (
    <PageWrapper
      onBack={() => history?.goBack()}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}
    >
      <Container bounded xl>
        <Row noGutters marginTop="8px">
          <Col>
            <LessonAdvancedForm />
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  )
}
