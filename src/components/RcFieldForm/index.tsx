import Form from './Form'
import Field from './Field'
import { useForm } from './FormStore'

type FormType = typeof Form

interface RefFormType extends FormType {
  useForm: typeof useForm
  Item: typeof Field
}

let RefForm: RefFormType = Form as RefFormType

RefForm.useForm = useForm
RefForm.Item = Field

export { Field }
export default RefForm
