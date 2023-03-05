import Form from './Form'

const App = () => {
  const [form] = Form.useForm()

  const submit = () => {
    form.submit()
  }

  const reset = () => {
    form.resetFields()
  }

  const onFinish = (values: any) => {
    console.log('finish', values)
  }

  return (
    <Form
      form={form}
      initialValues={{
        username: '123',
        is_admin: true,
      }}
      onFinish={onFinish}>
      <Form.Item label='用户名' name='username' initialValue='345'>
        <input type='text' />
      </Form.Item>
      <Form.Item label='number' name='number' initialValue='2'>
        <select>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
        </select>
      </Form.Item>
      <Form.Item label='是否是管理员' name='is_admin' valuePropName='checked'>
        <input type='checkbox' />
      </Form.Item>
      <Form.Item>
        <button type='button' onClick={submit}>
          提交
        </button>
        <button type='button' onClick={reset}>
          重置
        </button>
      </Form.Item>
    </Form>
  )
}

export default App
