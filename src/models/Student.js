import { model, attr, hasMany } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  marks: yup.array().default(null)
})

const Student = model(
  'student',
  {
    firstName: attr('string'),
    lastName: attr('string'),
    marks: hasMany('mark')
  },
  validationSchema
)

export default Student
