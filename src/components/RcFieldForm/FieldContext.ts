import React from 'react'
import { FormInstance } from './FormStore'

type FieldContextValues = FormInstance

const FieldContext = React.createContext<FieldContextValues>(null as any)

export default FieldContext
