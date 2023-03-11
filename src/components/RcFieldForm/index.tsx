import Form, { FormProps } from './Form'
import Field from './Field'
import { FormInstance, useForm } from './FormStore'
import { forwardRef } from 'react'

let InternalForm = forwardRef<FormInstance, FormProps>(Form)

type InternalFormType = typeof InternalForm
interface RefFormType extends InternalFormType {
  useForm: typeof useForm
  Item: typeof Field
}

let RefForm: RefFormType = InternalForm as RefFormType

RefForm.useForm = useForm
RefForm.Item = Field

export { Field }
export default RefForm
