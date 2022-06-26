import { Title, Button } from '@qonsoll/react-design'
import { CoefficientFilter } from './components'
import { StyledFilter, StyledHeader } from './EvaluationFilter.styles'
import { CloseOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const EvaluationFilter = ({
  filterVisibility,
  setFilterVisibility,
  filterData,
  setFilterData
}) => {
  const onCloseIconClick = () => setFilterVisibility(false)

  return (
    <>
      {filterVisibility ? (
        <>
          <StyledHeader
            background={[
              'rgba(255, 250, 260, 1)',
              'rgba(255, 250, 260, 1)',
              'rgba(255, 250, 260, 1)',
              'rgba(255, 255, 255, 0.25)'
            ]}
          >
            <Title mb="8px" level={4}>
              Filter
            </Title>
            <Button
              shape="circle"
              size="small"
              position="relative"
              left={16}
              type="text"
              onClick={onCloseIconClick}
              icon={<CloseOutlined style={{ fontSize: '12px' }} />}
            />
          </StyledHeader>
          <StyledFilter
            maxHeight={['calc(100vh - 225px)', 'calc(100vh - 205px)']}
            background={[
              'rgba(255, 250, 260, 1)',
              'rgba(255, 250, 260, 1)',
              'rgba(255, 250, 260, 1)',
              'rgba(255, 255, 255, 0.25)'
            ]}
          >
            <CoefficientFilter
              filterData={filterData}
              setFilterData={setFilterData}
            />
          </StyledFilter>
        </>
      ) : null}
    </>
  )
}

EvaluationFilter.propTypes = {
  filterVisibility: PropTypes.bool,
  setFilterVisibility: PropTypes.func,
  filterData: PropTypes.object,
  setFilterData: PropTypes.func
}

export default EvaluationFilter
