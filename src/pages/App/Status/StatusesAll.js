import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'
import { PageWrapper, Container, Row, Col, Spin } from '@qonsoll/react-design'
import { StatusList } from 'domains/Status/components'
import { HeaderBreadcrumbs } from 'components'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

const StatusesAll = () => {
  const [statuses, loading] = useCollectionData(
    firebase.firestore().collection('statuses')
  )
  const history = useHistory()
  const [listView] = useState(false)
  const headingProps = {
    title: 'Примітки',
    titleSize: 2,
    marginBottom: '16px'
  }

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
              <StatusList hideAddCard listView={listView} statuses={statuses} />
            </Col>
          )}
        </Row>
      </Container>
    </PageWrapper>
  )
}

export default StatusesAll
