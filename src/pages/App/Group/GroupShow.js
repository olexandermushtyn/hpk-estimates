import { PageWrapper, Container, Row, Col, Button } from '@qonsoll/react-design'
import { GroupAdvancedView } from 'domains/Group/components'
import { useTranslations } from 'contexts/Translation'
import { HeaderBreadcrumbs } from 'components'
import { useParams, useHistory } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'

export default function GroupShow() {
  const { t } = useTranslations()
  const history = useHistory()
  const params = useParams()
  const { groupId } = params
  const [group, loading] = useDocumentDataOnce(
    firebase.firestore().collection('groups').doc(groupId)
  )
  const headingProps = {
    title: group ? group?.name : '',
    titleSize: 2,
    marginBottom: '16px'
  }

  return (
    <PageWrapper
      action={
        <Button
          icon={<EditOutlined />}
          onClick={() => history.push(`${groupId}/edit`)}
        >
          Редагування
        </Button>
      }
      onBack={() => history?.goBack()}
      breadcrumbs={<HeaderBreadcrumbs />}
      headingProps={headingProps}
    >
      <Container bounded xl>
        <Row noGutters marginTop="8px">
          <Col>
            <GroupAdvancedView />
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  )
}
