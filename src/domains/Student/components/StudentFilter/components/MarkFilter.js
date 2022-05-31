import { Checkbox } from 'antd'
import PropTypes from 'prop-types'
import { useMarks } from 'domains/Mark/hooks'
import { useSubfilterActions } from 'hooks'
import { StyledDetails } from '../StudentFilter.styles'

const MarkFilter = ({ filterData, setFilterData }) => {
  const [marks] = useMarks()

  const summaryStyles = {
    marginBottom: '4px'
  }

  const { onToggleDetails, onChange, checkIsEnabled } = useSubfilterActions({
    filterData,
    setFilterData,
    fieldName: 'marks',
    operand: 'array-contains'
  })

  return (
    <StyledDetails
      open={localStorage.getItem(`mark-details-visibility`) === 'opened'}
    >
      <summary style={summaryStyles} onClick={() => onToggleDetails('mark')}>
        Mark
      </summary>
      {marks ? (
        marks?.map((mark, index) => (
          <div key={`status-${index}`}>
            <Checkbox
              key={`status-${index}`}
              checked={checkIsEnabled(mark)}
              onChange={() => onChange(mark)}
            >
              {mark?.name}
            </Checkbox>
          </div>
        ))
      ) : (
        <></>
      )}
    </StyledDetails>
  )
}

MarkFilter.propTypes = {
  filterData: PropTypes.object,
  setFilterData: PropTypes.func
}

export default MarkFilter
