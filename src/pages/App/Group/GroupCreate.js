import { PageWrapper, Container, Row, Col } from '@qonsoll/react-design'
import { GroupAdvancedForm } from 'domains/Group/components'
import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { useHistory } from 'react-router-dom'

export default function GroupCreate() {
  const { t } = useTranslations()
  const history = useHistory()
  const headingProps = {
    title: t('Create group'),
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
            <GroupAdvancedForm />
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  )
}
