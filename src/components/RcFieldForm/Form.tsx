import React, { ForwardRefRenderFunction } from 'react'
import FieldContext from './FieldContext'
import { FormInstance, useForm } from './FormStore'

type BaseFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>

export interface FormProps<Values = any> extends BaseFormProps {
  form?: FormInstance
  onFinish: (values: Values) => void
  onFinishFailed: (values: Values) => void
}

const Form: ForwardRefRenderFunction<FormInstance, FormProps> = ({ children, form, onFinish, onFinishFailed = () => {} }, ref) => {
  const [formInstance] = useForm(form)
  React.useImperativeHandle(ref, () => formInstance)
  formInstance?.setCallbacks({
    onFinish,
    onFinishFailed,
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        formInstance?.submit()
      }}>
      <FieldContext.Provider value={formInstance}>{children}</FieldContext.Provider>
    </form>
  )
}

export default Form
