import Form, { Field } from '../../components/RcFieldForm'
import { useEffect } from 'react'

const Input = ({ value = '', ...props }) => <input value={value} {...props} />

const nameRules = { required: true, message: '请输入姓名！' }
const passwordRules = { required: true, message: '请输入密码！' }

const MyFormPage = () => {
  // const [form] = Form.useForm()

  // useEffect(() => {
  //   console.log('my-form', form)

  //   form.setFieldsValue({
  //     username: 'initial',
  //   })
  // }, [])

  const onFinish = (values: any) => {
    console.log('my-form-finish:', values)
  }
  const onFinishFailed = (val: any) => {
    console.log('my-form-on-finish-failed', val)
  }
  return (
    <Form form={null} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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

export default MyFormPage
