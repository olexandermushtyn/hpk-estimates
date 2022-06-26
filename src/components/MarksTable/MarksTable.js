import Styles from './MarksTable.styles'
import { useTable } from 'react-table'
import { useMemo } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'
import { Spin } from '@qonsoll/react-design'

const MarksTable = ({ data }) => {
  const [evaluations, evaluationsLoading] = useCollectionData(
    firebase.firestore().collection('evalutaions')
  )

  const evaluationsColumn = useMemo(() => {
    return evaluations
      ?.map((evaluation, index) => ({
        Header: evaluation.name,
        columns: [
          {
            Header: 'шифр',
            accessor: evaluation._id + 'code'
          },
          {
            Header: 'бал',
            accessor: evaluation._id + 'mark'
          }
        ]
      }))
      .concat({
        Header: 'Всього ДБ',
        accessor: 'totalMark'
      })
  }, [evaluations])

  const columns = useMemo(
    () => [
      {
        Header: '№',
        accessor: 'index'
      },
      {
        Header: 'Група',
        accessor: 'group'
      },
      {
        Header: 'ПІБ',
        accessor: 'pib'
      },
      {
        Header: 'Середній бал',
        accessor: 'avgMark'
      },
      {
        Header: 'Середня успішність',
        accessor: 'success'
      },
      {
        Header: 'Додаткові бали (ДБ)',
        columns: evaluationsColumn
      },
      {
        Header: 'Рейтинговий бал',
        accessor: 'ratingMark'
      },
      {
        Header: 'Примітки',
        accessor: 'statuses'
      }
    ],
    [evaluationsColumn]
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data
    })

  return !evaluationsLoading ? (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <th key={index} {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <td key={index} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  ) : (
    <Spin />
  )
}

export default MarksTable
