import { PageWrapper, Container, Row, Col, Spin } from '@qonsoll/react-design'
import { MarkAdvancedForm } from 'domains/Mark/components'
import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDocument } from 'hooks'
import {} from 'domains/Mark/hooks'

export default function MarkEdit() {
  const { t } = useTranslations()
  const history = useHistory()
  const headingProps = {
    title: t('Edit mark'),
    titleSize: 2,
    marginBottom: '16px'
  }
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const { markId } = params

  const [mark] = useDocument({ ref: `marks/${markId}` })

  useEffect(() => {
    mark && setLoading(false)
  }, [mark])

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
              <MarkAdvancedForm initialData={{ mark }} />
            </Col>
          )}
        </Row>
      </Container>
    </PageWrapper>
  )
}
