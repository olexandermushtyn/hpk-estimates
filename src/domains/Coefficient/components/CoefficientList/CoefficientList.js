import { Card, Col, Row } from '@qonsoll/react-design'
import CoefficientSimpleView from '../CoefficientSimpleView'
import { Empty, AddItemCard } from 'components'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const CoefficientList = (props) => {
  const history = useHistory()
  const { t } = useTranslations()
  const onCreateButtonClick = () => history.push('/coefficient/create')
  const createButtonAction = props?.onCreateButtonClick || onCreateButtonClick
  const [isItemEdited, setIsItemEdited] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const onEmptySpaceClick = () => setSelectedItem(null)

  return (
    <Row onClick={onEmptySpaceClick} ml={-16} mr={-16}>
      {props?.coefficients?.length > 0 ? (
        <>
          {!props?.hideAddCard && (
            <AddItemCard
              cardWidth={props?.listView ? 12 : [12, 6, 4]}
              message="Add coefficient"
              onClickAction={
                props?.isListWithCreate
                  ? props?.onCreateButtonClick
                  : onCreateButtonClick
              }
            />
          )}
          {props?.coefficients?.map((coefficient, index) => (
            <Col
              key={coefficient?._id || index}
              cw={props?.listView ? 12 : [12, 6, 4]}
            >
              <Card
                onContextMenu={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedItem(coefficient?._id)
                }}
                bodyStyle={{ padding: '8px 0px', borderRadius: '12px' }}
                style={{
                  backgroundColor:
                    coefficient?._id === selectedItem
                      ? 'var(--ql-color-accent1-t-lighten6)'
                      : '',
                  borderWidth: '1px',
                  borderColor:
                    coefficient?._id === selectedItem
                      ? 'var(--ql-color-accent1-t-lighten4)'
                      : 'transparent'
                }}
                mb={32}
              >
                <CoefficientSimpleView
                  isItemEdited={isItemEdited}
                  setIsItemEdited={setIsItemEdited}
                  coefficient={coefficient}
                />
              </Card>
            </Col>
          ))}
        </>
      ) : (
        <Empty
          showImage={!props?.isListWithCreate}
          message={t('No coefficients')}
          onCreateButtonClick={createButtonAction}
        />
      )}
    </Row>
  )
}

CoefficientList.propTypes = {
  coefficients: PropTypes.array,
  onCreateButtonClick: PropTypes.func,
  isListWithCreate: PropTypes.bool,
  hideAddCard: PropTypes.bool,
  listView: PropTypes.bool
}

export default CoefficientList
