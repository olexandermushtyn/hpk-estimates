import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Dropdown, Menu, MenuItem } from '@qonsoll/react-design'

import PropTypes from 'prop-types'
import { useTranslations } from 'contexts/Translation'

const CardDropdown = ({ handleEdit, handleDelete, children }) => {
  const { t } = useTranslations()

  return (
    <Dropdown
      trigger={['contextMenu']}
      overlay={
        <Menu>
          <MenuItem
            key="edit"
            icon={<EditOutlined />}
            onClick={(event) => {
              event.domEvent.stopPropagation()
              handleEdit()
            }}
          >
            {t('Редагувати')}
          </MenuItem>
          <MenuItem
            key="delete"
            icon={<DeleteOutlined />}
            danger
            onClick={(event) => {
              event.domEvent.stopPropagation()
              handleDelete()
            }}
          >
            {t('Видалити')}
          </MenuItem>
        </Menu>
      }
    >
      {children}
    </Dropdown>
  )
}

CardDropdown.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default CardDropdown
