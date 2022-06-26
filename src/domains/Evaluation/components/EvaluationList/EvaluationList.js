import { Card, Col, Row } from '@qonsoll/react-design'
import EvaluationSimpleView from '../EvaluationSimpleView'
import { Empty, AddItemCard } from 'components'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const EvaluationList = (props) => {
  const history = useHistory()
  const { t } = useTranslations()
  const onCreateButtonClick = () => history.push('/evaluation/create')
  const createButtonAction = props?.onCreateButtonClick || onCreateButtonClick
  const [selectedItem, setSelectedItem] = useState(null)
  const onEmptySpaceClick = () => setSelectedItem(null)

  return (
    <Row onClick={onEmptySpaceClick} ml={-16} mr={-16}>
      {props?.evaluations?.length > 0 ? (
        <>
          {!props?.hideAddCard && (
            <AddItemCard
              cardWidth={props?.listView ? 12 : [12, 6, 4]}
              message="Add evaluation"
              onClickAction={
                props?.isListWithCreate
                  ? props?.onCreateButtonClick
                  : onCreateButtonClick
              }
            />
          )}
          {props?.evaluations?.map((evaluation, index) => (
            <Col
              key={evaluation?._id || index}
              cw={props?.listView ? 12 : [12, 6, 4]}
            >
              <Card
                onContextMenu={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedItem(evaluation?._id)
                }}
                bodyStyle={{ padding: '8px 0px', borderRadius: '12px' }}
                style={{
                  backgroundColor:
                    evaluation?._id === selectedItem
                      ? 'var(--ql-color-accent1-t-lighten6)'
                      : '',
                  borderWidth: '1px',
                  borderColor:
                    evaluation?._id === selectedItem
                      ? 'var(--ql-color-accent1-t-lighten4)'
                      : 'transparent'
                }}
                mb={32}
              >
                <EvaluationSimpleView evaluation={evaluation} />
              </Card>
            </Col>
          ))}
        </>
      ) : (
        <Empty
          showImage={!props?.isListWithCreate}
          message={t('Немає критеріїв оцінювання')}
          onCreateButtonClick={createButtonAction}
        />
      )}
    </Row>
  )
}

EvaluationList.propTypes = {
  evaluations: PropTypes.array,
  onCreateButtonClick: PropTypes.func,
  isListWithCreate: PropTypes.bool,
  hideAddCard: PropTypes.bool,
  listView: PropTypes.bool
}

export default EvaluationList
