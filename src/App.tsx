import './App.css'
import { useGetNewsQuery } from './app/services/news/newsApi'

function App() {
  const { data } = useGetNewsQuery({
    year: 2025,
    month: 4,
  })

  return (
    <div>
      <h1>besider-test</h1>
    </div>
  )
}

export default App
