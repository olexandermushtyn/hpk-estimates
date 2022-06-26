import { PageWrapper, Container, Row, Col, Spin } from '@qonsoll/react-design'
import { EvaluationList } from 'domains/Evaluation/components'
import { HeaderBreadcrumbs } from 'components'
import { useEvaluations } from 'domains/Evaluation/hooks'
import { useHistory } from 'react-router-dom'

import { useState } from 'react'

export default function EvaluationsAll() {
  const history = useHistory()
  const [listView] = useState(false)
  const [filterData] = useState({})
  const headingProps = {
    title: 'Критерії оцінювання',
    titleSize: 2,
    marginBottom: '16px'
  }
  const [evaluations, loading] = useEvaluations(filterData)

  return (
    <PageWrapper
      onBack={() => history?.goBack()}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}
    >
      <Container>
        <Row noGutters marginTop="8px">
          {loading ? (
            <Col>
              <Spin />
            </Col>
          ) : (
            <Col>
              <EvaluationList
                hideAddCard
                listView={listView}
                evaluations={evaluations}
              />
            </Col>
          )}
        </Row>
      </Container>
    </PageWrapper>
  )
}
