import { PageWrapper, Container, Row, Col } from '@qonsoll/react-design'
import { StudentAdvancedForm } from 'domains/Student/components'
import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { useHistory } from 'react-router-dom'

export default function StudentCreate() {
  const { t } = useTranslations()
  const history = useHistory()
  const headingProps = {
    title: t('Create student'),
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
            <StudentAdvancedForm />
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  )
}
