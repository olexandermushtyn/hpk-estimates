import { Card, Col, Row } from '@qonsoll/react-design'
import LessonSimpleView from '../LessonSimpleView'
import { Empty, AddItemCard } from 'components'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useTranslations } from 'contexts/Translation'

const LessonList = (props) => {
  const history = useHistory()
  const { t } = useTranslations()
  const onCreateButtonClick = () => history.push('/lesson/create')
  const createButtonAction = props?.onCreateButtonClick || onCreateButtonClick
  const [selectedItem, setSelectedItem] = useState(null)
  const [isItemEdited, setIsItemEdited] = useState(false)
  const onEmptySpaceClick = () => {
    setSelectedItem(null)
    setIsItemEdited(false)
  }

  return (
    <Row onClick={onEmptySpaceClick} ml={-16} mr={-16}>
      {props?.lessons?.length > 0 ? (
        <>
          {!props?.hideAddCard && (
            <AddItemCard
              cardWidth={props?.listView ? 12 : [12, 6, 4]}
              message="Додати предмет"
              onClickAction={
                props?.isListWithCreate
                  ? props?.onCreateButtonClick
                  : onCreateButtonClick
              }
            />
          )}
          {props?.lessons?.map((lesson, index) => (
            <Col
              key={lesson?._id || index}
              cw={props?.listView ? 12 : [12, 6, 4]}
            >
              <Card
                onContextMenu={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedItem(lesson?._id)
                }}
                bodyStyle={{ padding: '8px 0px', borderRadius: '12px' }}
                style={{
                  backgroundColor:
                    lesson?._id === selectedItem
                      ? 'var(--ql-color-accent1-t-lighten6)'
                      : '',
                  borderWidth: '1px',
                  borderColor:
                    lesson?._id === selectedItem
                      ? 'var(--ql-color-accent1-t-lighten4)'
                      : 'transparent'
                }}
                mb={32}
              >
                <LessonSimpleView
                  isItemEdited={isItemEdited}
                  setIsItemEdited={setIsItemEdited}
                  lesson={lesson}
                />
              </Card>
            </Col>
          ))}
        </>
      ) : (
        <Empty
          showImage={!props?.isListWithCreate}
          message={t('No lessons')}
          onCreateButtonClick={createButtonAction}
        />
      )}
    </Row>
  )
}

LessonList.propTypes = {
  lessons: PropTypes.array,
  onCreateButtonClick: PropTypes.func,
  isListWithCreate: PropTypes.bool,
  hideAddCard: PropTypes.bool,
  listView: PropTypes.bool
}

export default LessonList
