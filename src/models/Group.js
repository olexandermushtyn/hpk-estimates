import { model, attr, hasMany } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  students: yup.array().default(null)
})

const Group = model(
  'group',
  {
    name: attr('string'),
    students: hasMany('student')
  },
  validationSchema
)

export default Group
