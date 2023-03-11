import { useRef } from 'react'
import { FieldProps } from './Field'

type Store = {
  [key: string]: any
}

export interface FormInstance {
  getFieldValue: (name: string) => any
  getFieldsValue: () => Store
  setFieldsValue: (newStore: Store) => any
  getInternalHooks: typeof FormStore.prototype.getInternalHooks
  setCallbacks: typeof FormStore.prototype.setCallbacks
  submit: typeof FormStore.prototype.submit
}

export interface FieldEntity {
  onStoreChange: () => void
  props: FieldProps
}

export interface Callbacks<Values = any> {
  onFinish?: (values: Values) => void
  onFinishFailed?: (err: any, values: Values) => void
}

class FormStore {
  private store: Store = {}
  private fieldEntities: Array<FieldEntity> = []
  private callbacks: Callbacks = {}

  // 类方法里面写 this，还是用箭头函数吧。。。
  public getFieldValue = (name: string) => {
    return this.store[name]
  }
  public getFieldsValue = () => {
    return {
      ...this.store,
    }
  }
  public setFieldsValue = (newStore: Store) => {
    if (newStore) {
      this.store = {
        ...this.store,
        ...newStore,
      }
      this.fieldEntities.forEach((entity) => {
        Object.keys(newStore).forEach((key) => {
          if (key === entity.props.name) {
            entity.onStoreChange()
          }
        })
      })
    }
  }
  public registerField = (entity: FieldEntity) => {
    this.fieldEntities.push(entity)
    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity)
      delete this.store[entity.props.name]
    }
  }
  public setCallbacks = (newCallbacks: { onFinish: (values: any) => void; onFinishFailed: (errors: any) => void }) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    }
  }
  public validate = () => {
    const err: any = []
    this.fieldEntities.forEach((item) => {
      const { name, rules } = item.props
      const rule = rules && rules[0]
      const value = this.getFieldValue(name)
      if (rule && rule.required) {
        if (!value) {
          err.push({
            [name]: rule.message,
            value,
          })
        }
      }
    })
    return err
  }
  public submit = () => {
    const err = this.validate()
    const { onFinish, onFinishFailed } = this.callbacks
    if (err.length === 0) {
      if (onFinish) onFinish(this.getFieldsValue())
    } else {
      if (onFinishFailed) onFinishFailed(err, this.getFieldsValue())
    }
  }

  public getInternalHooks = () => {
    return {
      registerField: this.registerField,
    }
  }
  public getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      getInternalHooks: this.getInternalHooks,
      setCallbacks: this.setCallbacks,
      submit: this.submit,
    }
  }
}

export const useForm = (): [FormInstance] => {
  const formRef = useRef<FormInstance>()
  if (!formRef.current) {
    const formStore = new FormStore()
    formRef.current = formStore.getForm()
  }
  return [formRef.current]
}
