import { PageWrapper, Container, Row, Col, Button } from '@qonsoll/react-design'
import { StudentAdvancedView } from 'domains/Student/components'
import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { useParams, useHistory } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'

export default function StudentShow() {
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()
  const { studentId } = params

  const headingProps = {
    title: t('Студент'),
    titleSize: 2,
    marginBottom: '16px'
  }

  return (
    <PageWrapper
      action={
        <Button
          icon={<EditOutlined />}
          onClick={() => history.push(`${studentId}/edit`)}
        >
          {t('Редагування')}
        </Button>
      }
      onBack={() => history?.goBack()}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}
    >
      <Container bounded xl>
        <Row noGutters marginTop="8px">
          <Col>
            <StudentAdvancedView />
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  )
}
