import { model, attr } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  lesson: yup.string().required(),
  rating: yup.number().required()
})

const Mark = model(
  'mark',
  {
    lesson: attr('string'),
    rating: attr('number')
  },
  validationSchema
)

export default Mark
