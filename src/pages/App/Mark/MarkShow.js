import { PageWrapper, Container, Row, Col, Button } from '@qonsoll/react-design'
import { MarkAdvancedView } from 'domains/Mark/components'
import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { useParams, useHistory } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'

export default function MarkShow() {
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()
  const { markId } = params
  const headingProps = {
    title: t('Mark'),
    titleSize: 2,
    marginBottom: '16px'
  }

  return (
    <PageWrapper
      action={
        <Button
          icon={<EditOutlined />}
          onClick={() => history.push(`${markId}/edit`)}
        >
          {t('Edit')}
        </Button>
      }
      onBack={() => history?.goBack()}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}
    >
      <Container bounded xl>
        <Row noGutters marginTop="8px">
          <Col>
            <MarkAdvancedView />
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  )
}
