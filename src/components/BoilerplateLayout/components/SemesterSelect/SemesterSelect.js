import { Row, Col, Text } from '@qonsoll/react-design'
import { DatePicker, Select } from 'antd'
import { useSemester } from 'contexts/SemesterContext'

const { RangePicker } = DatePicker
const { Option } = Select

const SemesterSelect = () => {
  const { semester, changeSemester, changeYear } = useSemester()

  return (
    <Row mb="24px">
      <Col>
        <Text>Оберіть навчальний рік</Text>
        <RangePicker
          onChange={changeYear}
          value={semester?.year}
          yearStep={1}
          placeholder={['Рік початку', 'Рік закінчення']}
          picker="year"
        />
        <Text>Оберіть семетр</Text>
        <Select
          onChange={changeSemester}
          value={semester?.semester}
          placeholder="Обреріть семестр"
        >
          <Option value={1} />
          <Option value={2} />
        </Select>
      </Col>
    </Row>
  )
}

export default SemesterSelect
