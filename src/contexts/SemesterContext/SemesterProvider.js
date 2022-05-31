import { SemesterContext } from '.'
import { useState } from 'react'
import moment from 'moment'

const SemesterProvider = ({ children }) => {
  const getInitialState = () => {
    if (localStorage.getItem('semester')) {
      const data = JSON.parse(localStorage.getItem('semester'))
      const { year, semester } = data
      const transformedYear = year.map((item) => moment(item))
      return {
        year: transformedYear,
        semester
      }
    } else {
      return {
        year: [
          moment().year(new Date().getFullYear()),
          moment().year(new Date().getFullYear() - 1)
        ],
        semester: 1
      }
    }
  }

  const [currentDate, setSemester] = useState(getInitialState())

  const changeYear = (year) => {
    setSemester({ ...currentDate, year })
    localStorage.setItem('semester', JSON.stringify({ ...currentDate, year }))
  }

  const changeSemester = (year) => {
    setSemester({ ...currentDate, semester: year })
    localStorage.setItem(
      'semester',
      JSON.stringify({ ...currentDate, semester: year })
    )
  }

  return (
    <SemesterContext.Provider
      value={{ semester: currentDate, changeYear, changeSemester }}
    >
      {children}
    </SemesterContext.Provider>
  )
}

export default SemesterProvider
