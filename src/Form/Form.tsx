import React, { useMemo, useRef } from 'react'
import FieldContext from './FieldContext'
import type { FormInstance } from './FormStore'
import { useForm } from './FormStore'
import type { Callbacks, Store } from './typings'

type BaseFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>

export interface FormProps<Values = any> extends BaseFormProps {
  form?: FormInstance
  initialValues?: Store
  children?: React.ReactNode
  onFinish?: Callbacks<Values>['onFinish']
  onValuesChange?: Callbacks<Values>['onValuesChange']
}

const Form: React.ForwardRefRenderFunction<FormInstance, FormProps> = ({ form, initialValues, children, onValuesChange, onFinish, onReset }, ref) => {
  const [formInstance] = useForm(form)

  React.useImperativeHandle(ref, () => formInstance)

  const { setCallbacks, setInitialValues } = formInstance.getInternalHooks()

  setCallbacks({
    onValuesChange,
    onFinish: (values: Store) => {
      if (onFinish) {
        onFinish(values)
      }
    },
  })

  const mountRef = useRef(false)
  setInitialValues(initialValues, !mountRef.current)
  if (!mountRef.current) {
    mountRef.current = true
  }

  const fieldContextValue = useMemo(
    () => ({
      ...formInstance,
    }),
    [formInstance]
  )

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()
        formInstance.submit()
      }}
      onReset={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        formInstance.resetFields()
        onReset?.(event)
      }}>
      <FieldContext.Provider value={fieldContextValue}>{children}</FieldContext.Provider>
    </form>
  )
}

export default Form
