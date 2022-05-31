import { PageWrapper, Container, Row, Col, Button } from '@qonsoll/react-design'
import { LessonAdvancedView } from 'domains/Lesson/components'
import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { useParams, useHistory } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'

export default function LessonShow() {
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()
  const { lessonId } = params
  const headingProps = {
    title: t('Lesson'),
    titleSize: 2,
    marginBottom: '16px'
  }

  return (
    <PageWrapper
      action={
        <Button
          icon={<EditOutlined />}
          onClick={() => history.push(`${lessonId}/edit`)}
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
            <LessonAdvancedView />
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  )
}
