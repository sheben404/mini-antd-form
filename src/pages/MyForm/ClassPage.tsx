import Form, { Field } from '@/components/RcFieldForm'
import { FormInstance } from '@/components/RcFieldForm/FormStore'
import React from 'react'
import { Component } from 'react'

const Input = ({ value = '', ...props }) => <input value={value} {...props} />

const nameRules = { required: true, message: '请输入姓名！' }
const passwordRules = { required: true, message: '请输入密码！' }

export default class MyFormClassPage extends Component {
  formRef = React.createRef<FormInstance>()
  componentDidMount() {
    console.log('my-form-in-class-componet', this.formRef.current)
    this.formRef.current?.setFieldsValue({ username: 'default' })
  }

  onFinish = (values: any) => {
    console.log('my-form-finish-in-class-component:', values)
  }
  onFinishFailed = (err: any) => {
    console.log('my-form-on-finish-failed-in-class-component:', err)
  }
  render() {
    return (
      <div>
        <h3>my-form-in-class-components</h3>
        <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
          <Field name='username' rules={[nameRules]}>
            <Input placeholder='Username' />
          </Field>
          <Field name='password' rules={[passwordRules]}>
            <Input placeholder='Password' />
          </Field>
          <button>Submit</button>
        </Form>
      </div>
    )
  }
}
