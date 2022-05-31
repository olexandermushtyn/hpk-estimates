import { PageWrapper, Container, Row, Col, Spin } from '@qonsoll/react-design'
import { GroupAdvancedForm } from 'domains/Group/components'
import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDocument } from 'hooks'
import { useGroupStudents } from 'domains/Group/hooks'

export default function GroupEdit() {
  const { t } = useTranslations()
  const history = useHistory()
  const headingProps = {
    title: t('Edit group'),
    titleSize: 2,
    marginBottom: '16px'
  }
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const { groupId } = params

  const [group] = useDocument({ ref: `groups/${groupId}` })
  const [students] = useGroupStudents(groupId)

  useEffect(() => {
    group && students && setLoading(false)
  }, [group, students])

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
              <GroupAdvancedForm initialData={{ group, students }} />
            </Col>
          )}
        </Row>
      </Container>
    </PageWrapper>
  )
}
