import { PageWrapper, Container, Row, Col, Button } from '@qonsoll/react-design'
import { EvaluationAdvancedView } from 'domains/Evaluation/components'
import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { useParams, useHistory } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'

export default function EvaluationShow() {
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()
  const { evaluationId } = params
  const headingProps = {
    title: t('Критерій оцінювання'),
    titleSize: 2,
    marginBottom: '16px'
  }

  return (
    <PageWrapper
      action={
        <Button
          icon={<EditOutlined />}
          onClick={() => history.push(`${evaluationId}/edit`)}
        >
          {t('Редагувати')}
        </Button>
      }
      onBack={() => history?.goBack()}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}
    >
      <Container bounded xl>
        <Row noGutters marginTop="8px">
          <Col>
            <EvaluationAdvancedView />
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  )
}
