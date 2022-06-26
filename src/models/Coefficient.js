import { model, attr } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  mark: yup.number().required()
})

const Coefficient = model(
  'coefficient',
  {
    name: attr('string'),
    mark: attr('number'),
    code: attr('string')
  },
  validationSchema
)

export default Coefficient
