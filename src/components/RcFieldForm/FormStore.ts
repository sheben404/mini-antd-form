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
}

export interface FieldEntity {
  onStoreChange: () => void
  props: FieldProps
}

class FormStore {
  private store: Store = {}
  private fieldEntities: Array<FieldEntity> = []

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
            console.log('entity', entity)
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
