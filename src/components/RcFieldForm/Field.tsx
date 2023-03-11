import React, { ReactElement } from 'react'
import FieldContext from './FieldContext'
import { FieldEntity } from './FormStore'

export type FieldProps = {
  children: ReactElement
  name: string
  rules: Array<{
    required?: boolean
    message?: string
  }>
}

class Field extends React.Component<FieldProps> implements FieldEntity {
  static contextType = FieldContext
  declare context: React.ContextType<typeof FieldContext>

  unregister: () => void = () => {}

  componentDidMount(): void {
    this.unregister = this.context.getInternalHooks().registerField(this)
  }

  componentWillUnmount(): void {
    this.unregister()
  }

  onStoreChange = () => {
    this.forceUpdate()
  }

  getControlled = () => {
    const { getFieldValue, setFieldsValue } = this.context
    const { name } = this.props
    return {
      value: getFieldValue(name),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setFieldsValue({ [name]: newValue })
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
