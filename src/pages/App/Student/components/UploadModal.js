import { InboxOutlined } from '@ant-design/icons'
import { message, Modal, Upload } from 'antd'
import { useStudentsActions } from 'domains/Student/hooks'
import { useState } from 'react'
import { ExcelRenderer } from 'react-excel-renderer'

const { Dragger } = Upload

const UploadModal = ({ isModalVisible, setIsModalVisible }) => {
  const { uploadStudents, loading } = useStudentsActions()
  const [tableData, setTableData] = useState([])

  const handleOk = async () => {
    await uploadStudents(tableData)
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const beforeUpload = (file) => {
    const isExcel =
      file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    if (!isExcel) {
      message.error('Ви можете імпортувати лише файли Excel!')
    }
    return isExcel || Upload.LIST_IGNORE
  }

  const onChange = (info) => {
    const { status } = info.file

    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }

    if (status === 'done') {
      message.success(`${info.file.name} успішно імпортовано.`)
    }
  }

  const action = (file) =>
    ExcelRenderer(file, (err, resp) => {
      if (err) {
        console.error(err)
      } else {
        console.log(resp)
        setTableData(resp.rows)
      }
    })

  return (
    <Modal
      title="Імпорт даних"
      visible={isModalVisible}
      onOk={handleOk}
      okButtonProps={{
        loading
      }}
      onCancel={handleCancel}
    >
      <Dragger action={action} beforeUpload={beforeUpload} onChange={onChange}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Нажміть щоб завантажити файли, або перетягніть файли сюди
        </p>
        <p className="ant-upload-hint">
          Приклад файлу:
          <br />
          <b>Назва файлу:</b> Імпорт даних.xlsx
        </p>
      </Dragger>
    </Modal>
  )
}

export default UploadModal
