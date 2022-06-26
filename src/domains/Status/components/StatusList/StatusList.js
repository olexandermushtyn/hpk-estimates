import { Card, Col, Row } from '@qonsoll/react-design'
import { StatusSimpleView } from '../'
import { Empty, AddItemCard } from 'components'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const StatusList = (props) => {
  const history = useHistory()
  const { t } = useTranslations()
  const onCreateButtonClick = () => history.push('/evaluation/create')
  const createButtonAction = props?.onCreateButtonClick || onCreateButtonClick
  const [selectedItem, setSelectedItem] = useState(null)
  const onEmptySpaceClick = () => setSelectedItem(null)

  return (
    <Row onClick={onEmptySpaceClick} ml={-16} mr={-16}>
      {props?.statuses?.length > 0 ? (
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
          {props?.statuses?.map((status, index) => (
            <Col
              key={status?._id || index}
              cw={props?.listView ? 12 : [12, 6, 4]}
            >
              <Card
                onContextMenu={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedItem(status?._id)
                }}
                bodyStyle={{ padding: '8px 0px', borderRadius: '12px' }}
                style={{
                  backgroundColor:
                    status?._id === selectedItem
                      ? 'var(--ql-color-accent1-t-lighten6)'
                      : '',
                  borderWidth: '1px',
                  borderColor:
                    status?._id === selectedItem
                      ? 'var(--ql-color-accent1-t-lighten4)'
                      : 'transparent'
                }}
                mb={32}
              >
                <StatusSimpleView status={status} />
              </Card>
            </Col>
          ))}
        </>
      ) : (
        <Empty
          showImage={!props?.isListWithCreate}
          message={t('Немає приміток')}
          onCreateButtonClick={createButtonAction}
        />
      )}
    </Row>
  )
}

export default StatusList
