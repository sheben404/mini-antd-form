import React from 'react'
import type { FieldContextValues } from './FieldContext'
import FieldContext from './FieldContext'
import type { FieldEntity } from './typings'

export function defaultGetValueFromEvent(valuePropName: string, ...args: any[]) {
  const event = args[0]
  if (event && event.target && valuePropName in event.target) {
    // @ts-expect-error
    return (event.target as HTMLInputElement)[valuePropName]
  }

  return event
}

export interface FieldProps {
  name?: string
  label?: string
  initialValue?: any
  children?: React.ReactNode
  valuePropName?: string
  trigger?: string
  getValueFromEvent?: (...args: any[]) => any
  fieldContext: FieldContextValues
}

type ChildProps = Record<string, any>

export interface FieldState {
  resetCount: number
}

class Field extends React.Component<FieldProps, FieldState> implements FieldEntity {
  private mounted = false

  public state = {
    resetCount: 0,
  }

  constructor(props: FieldProps) {
    super(props)
    const { getInternalHooks } = props.fieldContext
    getInternalHooks().initEntityValue(this)
  }

  public componentDidMount() {
    this.mounted = true
    const { getInternalHooks } = this.props.fieldContext
    getInternalHooks().registerField(this)
  }

  public onStoreChange: FieldEntity['onStoreChange'] = (preStore, namePathList, info) => {
    const { store } = info
    const prevValue = preStore[this.props.name!]
    const curValue = store[this.props.name!]
    const nameMatch = namePathList && namePathList.includes(this.props.name!)

    switch (info.type) {
      case 'reset':
        if (!namePathList || nameMatch) this.refresh()

        break
      default:
        if (nameMatch || prevValue !== curValue) this.reRender()

        break
    }
  }

  public refresh = () => {
    if (!this.mounted) return
    this.setState(({ resetCount }) => ({
      resetCount: resetCount + 1,
    }))
  }

  public reRender() {
    if (!this.mounted) return
    this.forceUpdate()
  }

  public getControlled = (childProps: ChildProps = {}) => {
    const { fieldContext, name, valuePropName = 'value', getValueFromEvent, trigger = 'onChange' } = this.props
    const value = name ? this.props.fieldContext.getFieldValue(name) : undefined
    const mergedGetValueProps = (val: any) => ({ [valuePropName]: val })

    const control = {
      ...childProps,
      ...mergedGetValueProps(value),
    }

    const originTriggerFunc: any = childProps[trigger]

    control[trigger] = (...args: any[]) => {
      let newValue: any
      if (getValueFromEvent) newValue = getValueFromEvent(...args)
      else newValue = defaultGetValueFromEvent(valuePropName, ...args)

      fieldContext.getInternalHooks().updateValue(name, newValue)
      if (originTriggerFunc) originTriggerFunc(...args)
    }

    return control
  }

  public render() {
    const { resetCount } = this.state
    const { children } = this.props

    let returnChildNode: React.ReactNode
    if (React.isValidElement(children)) returnChildNode = React.cloneElement(children, this.getControlled(children.props))
    else returnChildNode = children

    return <React.Fragment key={resetCount}>{returnChildNode}</React.Fragment>
  }
}

function WrapperField(props: Omit<FieldProps, 'fieldContext'>) {
  const fieldContext = React.useContext(FieldContext)
  return (
    <div style={{ display: 'flex', marginBottom: 12 }}>
      <div style={{ width: 100 }}>{props.label}</div>
      <Field {...props} fieldContext={fieldContext} />
    </div>
  )
}

export default WrapperField
