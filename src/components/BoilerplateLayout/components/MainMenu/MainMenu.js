import {
  TeamOutlined,
  BookOutlined,
  FieldBinaryOutlined
} from '@ant-design/icons'
import { Menu, MenuItem } from '@qonsoll/react-design'

import { SemesterSelect } from '../'
import { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

const MainMenu = () => {
  const history = useHistory()
  const menuItems = useMemo(
    () => [
      {
        value: 'GROUPS',
        icon: <TeamOutlined />,
        text: 'Групи',
        onClick: () => history.push('/groups')
      },
      {
        value: 'LESSONS',
        icon: <BookOutlined />,
        text: 'Предмети',
        onClick: () => history.push('/lessons')
      },
      {
        value: 'MARKS',
        icon: <FieldBinaryOutlined />,
        text: 'Оцінки',
        onClick: () => history.push('/marks')
      }
    ],
    [history]
  )
  return (
    <>
      <SemesterSelect />
      <Menu mode="inline">
        {menuItems.map((item, index) => (
          <MenuItem
            onClick={item.onClick}
            key={`${item.value}-${index}`}
            icon={item.icon}
          >
            {item.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default MainMenu
