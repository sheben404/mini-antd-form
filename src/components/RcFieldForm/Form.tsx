import { FC, ReactNode } from 'react'
import FieldContext from './FieldContext'
import { FormInstance } from './FormStore'

type BaseFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>

interface FormProps<Values = any> extends BaseFormProps {
  form: FormInstance
  onFinish: (values: Values) => void
  onFinishFailed: (values: Values) => void
}

const Form: FC<FormProps> = ({ children, form }) => {
  return (
    <form>
      <FieldContext.Provider value={form}>{children}</FieldContext.Provider>
    </form>
  )
}

export default Form
