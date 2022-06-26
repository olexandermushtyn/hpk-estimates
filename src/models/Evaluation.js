import { model, attr, hasMany } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  coefficients: yup.array().default(null)
})

const Evaluation = model(
  'evaluation',
  {
    name: attr('string'),
    coefficients: hasMany('coefficient')
  },
  validationSchema
)

export default Evaluation
