import React, { ReactElement } from 'react'
import FieldContext from './FieldContext'

type FieldProps = {
  children: ReactElement
  name: string
  rules: Array<{
    required?: boolean
    message?: string
  }>
}

class Field extends React.Component<FieldProps> {
  static contextType = FieldContext
  declare context: React.ContextType<typeof FieldContext>
  getControlled = () => {
    const { getFieldValue, setFieldsValue } = this.context
    const { name } = this.props
    return {
      value: getFieldValue(name),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setFieldsValue({ [name]: newValue })
        this.forceUpdate()
      },
    }
  }
  render() {
    const { children } = this.props
    const returnElement = React.cloneElement(children, this.getControlled())
    return returnElement
  }
}

export default Field
