import { useEffect, useState } from 'react'

import { getDocument } from 'services/firestore'

export default function useStudentMarks(student) {
  const [marks, setMarks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const promises =
        student && student?.marks?.map((mark) => getDocument('marks', mark))
      const data = promises && (await Promise.all(promises))
      setMarks(data)
      setLoading(false)
    }

    fetchData()
  }, [student])

  return [marks, loading]
}
