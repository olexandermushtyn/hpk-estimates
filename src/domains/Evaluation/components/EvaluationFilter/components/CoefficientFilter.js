import { Checkbox } from 'antd'
import PropTypes from 'prop-types'
import { useCoefficients } from 'domains/Coefficient/hooks'
import { useSubfilterActions } from 'hooks'
import { StyledDetails } from '../EvaluationFilter.styles'

const CoefficientFilter = ({ filterData, setFilterData }) => {
  const [coefficients] = useCoefficients()

  const summaryStyles = {
    marginBottom: '4px'
  }

  const { onToggleDetails, onChange, checkIsEnabled } = useSubfilterActions({
    filterData,
    setFilterData,
    fieldName: 'coefficients',
    operand: 'array-contains'
  })

  return (
    <StyledDetails
      open={localStorage.getItem(`coefficient-details-visibility`) === 'opened'}
    >
      <summary
        style={summaryStyles}
        onClick={() => onToggleDetails('coefficient')}
      >
        Coefficient
      </summary>
      {coefficients ? (
        coefficients?.map((coefficient, index) => (
          <div key={`status-${index}`}>
            <Checkbox
              key={`status-${index}`}
              checked={checkIsEnabled(coefficient)}
              onChange={() => onChange(coefficient)}
            >
              {coefficient?.name}
            </Checkbox>
          </div>
        ))
      ) : (
        <></>
      )}
    </StyledDetails>
  )
}

CoefficientFilter.propTypes = {
  filterData: PropTypes.object,
  setFilterData: PropTypes.func
}

export default CoefficientFilter
