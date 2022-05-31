const LS_LABEL = 'details-visibility'

const useSubfilterActions = ({
  filterData,
  setFilterData,
  fieldName,
  operand
}) => {
  const onToggleDetails = (type) => {
    const currentState = localStorage.getItem(`${type}-${LS_LABEL}`)
    if (!currentState || currentState === 'closed') {
      localStorage.setItem(`${type}-${LS_LABEL}`, 'opened')
    } else {
      localStorage.setItem(`${type}-${LS_LABEL}`, 'closed')
    }
  }

  const checkIsEnabled = (data) =>
    filterData?.where?.some((query) => query?.includes(data))

  const ifFilterDataHasAnyCategory = () =>
    filterData?.where
      ? filterData?.where?.findIndex((query) => query?.includes(fieldName))
      : -1

  const onChange = (data) => {
    if (checkIsEnabled(data)) {
      setFilterData((prev) => {
        return {
          where: [...prev.where.filter((query) => !query.includes(data))]
        }
      })
    } else {
      const index = ifFilterDataHasAnyCategory()
      setFilterData((prev) => {
        const newFilterData = { ...prev }
        if (index === -1) {
          newFilterData.where = !Array.isArray(newFilterData.where)
            ? [[fieldName, operand, data]]
            : [...newFilterData.where, [fieldName, operand, data]]
        } else {
          newFilterData.where[index] = [...[fieldName, operand, data]]
        }
        return JSON.parse(JSON.stringify({ ...newFilterData }))
      })
    }
  }

  return { onChange, checkIsEnabled, onToggleDetails }
}

export default useSubfilterActions
