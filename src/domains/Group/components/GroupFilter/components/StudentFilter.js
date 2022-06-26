import { Checkbox } from 'antd'
import PropTypes from 'prop-types'
import { useSubfilterActions } from 'hooks'
import { StyledDetails } from '../GroupFilter.styles'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'
import { useMemo } from 'react'

const chairsMap = {
  ПІ: 'Програмна інженерія',
  КІ: 'Комп’ютерна інженерія',
  АТ: 'Автомобільний транспорт',
  МЄ: 'Менеджмент',
  ЕК: 'Економіка',
  ПМ: 'Прикладна механіка',
  МГ: 'Галузеве машинобудування'
}

const StudentFilter = ({ filterData, setFilterData }) => {
  const [groups] = useCollectionData(firebase.firestore().collection('groups'))

  const groupChairs = useMemo(() => {
    const chairs = new Set()
    groups?.forEach((group) => {
      const [chair] = group.name.split('-')
      chairs.add(chairsMap[chair])
    })
    return Array.from(chairs)
  }, [groups])

  const summaryStyles = {
    marginBottom: '4px'
  }

  const { onToggleDetails, onChange, checkIsEnabled } = useSubfilterActions({
    filterData,
    setFilterData,
    fieldName: 'students',
    operand: 'array-contains'
  })

  return (
    <StyledDetails
      open={localStorage.getItem(`student-details-visibility`) === 'opened'}
    >
      <summary style={summaryStyles} onClick={() => onToggleDetails('student')}>
        Відділення
      </summary>
      {groupChairs ? (
        groupChairs?.map((chair, index) => (
          <div key={`status-${index}`}>
            <Checkbox
              key={`status-${index}`}
              checked={checkIsEnabled(chair)}
              onChange={() => onChange(chair)}
            >
              {chair}
            </Checkbox>
          </div>
        ))
      ) : (
        <></>
      )}
    </StyledDetails>
  )
}

StudentFilter.propTypes = {
  filterData: PropTypes.object,
  setFilterData: PropTypes.func
}

export default StudentFilter
