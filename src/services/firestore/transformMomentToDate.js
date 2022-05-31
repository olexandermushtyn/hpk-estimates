import moment from 'moment'

const transformMomentToDate = (data) =>
  Object.keys(data).reduce((acc, key) => {
    const value = data[key]
    if (moment.isMoment(value)) {
      acc[key] = value.format('YYYY-MM-DD')
    } else {
      acc[key] = value
    }
    return acc
  }, {})

export default transformMomentToDate
