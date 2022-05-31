import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'
import { useMemo } from 'react'

const chairsMap = {
  ПІ: 'Програмна інженерія',
  КІ: 'Комп’ютерна інженерія',
  АТ: 'Автомобільний транспорт',
  МЄ: 'Менеджмент'
}

const objectFlip = (obj) => {
  const ret = {}
  Object.keys(obj).forEach((key) => {
    ret[obj[key]] = key
  })
  return ret
}

export default function useGroups(props) {
  const char = useMemo(
    () => objectFlip(chairsMap)[props?.where?.[0]?.[2]],
    [props?.where]
  )
  const [value, loading, error, next, loadingMore, loadMoreAvailable] =
    useCollectionData(firebase.firestore().collection('groups'), {
      orderBy: ['name', 'asc']
    })

  const filteredData = useMemo(
    () => (char ? value.filter((group) => group.name.includes(char)) : value),
    [char, value]
  )

  return [filteredData, loading, error, next, loadingMore, loadMoreAvailable]
}
