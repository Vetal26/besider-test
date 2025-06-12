import './App.css'
import { useGetNewsQuery } from './app/services/news/newsApi'
import MainLayout from './layouts/MainLayout'

function App() {
  const { data } = useGetNewsQuery({
    year: 2025,
    month: 4,
  })

  return (
    <MainLayout>
      <h1>besider-test</h1>
    </MainLayout>
  )
}

export default App
