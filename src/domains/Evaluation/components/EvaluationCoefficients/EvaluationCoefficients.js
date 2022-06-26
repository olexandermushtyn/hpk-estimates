import { Container, Row, Col, Text } from '@qonsoll/react-design'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { CoefficientList } from '../../../Coefficient/components'
import firebase from 'firebase/compat/app'

const EvaluationCoefficients = (props) => {
  const [coefficients, loading] = useCollectionDataOnce(
    props.evaluation &&
      firebase
        .firestore()
        .collection('evalutaions')
        .doc(props.evaluation)
        .collection('coefficients')
  )

  return (
    <Container>
      <Row noGutters>
        {loading ? (
          <Col>
            <Text>Loading...</Text>
          </Col>
        ) : null}
        {!loading && coefficients?.length ? (
          <Col>
            <CoefficientList
              hideAddCard
              loading={loading}
              coefficients={coefficients}
            />
          </Col>
        ) : null}
      </Row>
    </Container>
  )
}

export default EvaluationCoefficients
