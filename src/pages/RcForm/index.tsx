import Form, { Field } from 'rc-field-form'
import { useEffect } from 'react'

const Input = ({ value = '', ...props }) => <input value={value} {...props} />

const nameRules = { required: true, message: '请输入姓名！' }
const passwordRules = { required: true, message: '请输入密码！' }

const RcFormPage = () => {
  const [form] = Form.useForm()

  useEffect(() => {
    console.log('rc-form', form)

    form.setFieldsValue({
      username: 'initial',
    })
  }, [])

  const onFinish = (values: any) => {
    console.log('rc-form-finish:', values)
  }
  const onFinishFailed = (val: any) => {
    console.log('rc-form-on-finish-failed', val)
  }
  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Field name='username' rules={[nameRules]}>
        <Input placeholder='Username' />
      </Field>
      <Field name='password' rules={[passwordRules]}>
        <Input placeholder='Password' />
      </Field>
      <button>Submit</button>
    </Form>
  )
}

export default RcFormPage
