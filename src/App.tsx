import MyFormPage from './pages/MyForm'
import MyFormClassPage from './pages/MyForm/ClassPage'
import RcFormPage from './pages/RcForm'

const App = () => {
  return (
    <div>
      <RcFormPage />
      <br />
      <hr />
      <br />
      <MyFormPage />
      <br />
      <hr />
      <br />
      <MyFormClassPage />
    </div>
  )
}

export default App
