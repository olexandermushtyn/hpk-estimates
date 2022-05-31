import { Card, Col, Row } from '@qonsoll/react-design'
import MarkSimpleView from '../MarkSimpleView'
import { Empty, AddItemCard } from 'components'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const MarkList = (props) => {
  const history = useHistory()
  const { t } = useTranslations()
  const onCreateButtonClick = () => history.push('/mark/create')
  const createButtonAction = props?.onCreateButtonClick || onCreateButtonClick
  const [selectedItem, setSelectedItem] = useState(null)
  const onEmptySpaceClick = () => setSelectedItem(null)

  return (
    <Row onClick={onEmptySpaceClick} ml={-16} mr={-16}>
      {props?.marks?.length > 0 ? (
        <>
          {!props?.hideAddCard && (
            <AddItemCard
              cardWidth={props?.listView ? 12 : [12, 6, 4]}
              message="Додати оцінку"
              onClickAction={
                props?.isListWithCreate
                  ? props?.onCreateButtonClick
                  : onCreateButtonClick
              }
            />
          )}
          {props?.marks?.map((mark, index) => (
            <Col
              key={mark?._id || index}
              cw={props?.listView ? 12 : [12, 6, 4]}
            >
              <Card
                onContextMenu={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedItem(mark?._id)
                }}
                bodyStyle={{ padding: '8px 0px', borderRadius: '12px' }}
                style={{
                  backgroundColor:
                    mark?._id === selectedItem
                      ? 'var(--ql-color-accent1-t-lighten6)'
                      : '',
                  borderWidth: '1px',
                  borderColor:
                    mark?._id === selectedItem
                      ? 'var(--ql-color-accent1-t-lighten4)'
                      : 'transparent'
                }}
                mb={32}
              >
                <MarkSimpleView mark={mark} />
              </Card>
            </Col>
          ))}
        </>
      ) : (
        <Empty
          showImage={!props?.isListWithCreate}
          message={t('No marks')}
          onCreateButtonClick={createButtonAction}
        />
      )}
    </Row>
  )
}

MarkList.propTypes = {
  marks: PropTypes.array,
  onCreateButtonClick: PropTypes.func,
  isListWithCreate: PropTypes.bool,
  hideAddCard: PropTypes.bool,
  listView: PropTypes.bool
}

export default MarkList
