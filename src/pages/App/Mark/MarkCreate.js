import { PageWrapper, Container, Row, Col } from '@qonsoll/react-design'
import { MarkAdvancedForm } from 'domains/Mark/components'
import { HeaderBreadcrumbs } from 'components'
import { useHistory } from 'react-router-dom'

export default function MarkCreate() {
  const history = useHistory()
  const headingProps = {
    title: 'Додати оцінку',
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
            <MarkAdvancedForm />
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  )
}
