import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/homePage'
import { getHomePageRoute } from './lib/routes'
import './styles/global.scss'
import { Layout } from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
             <Route path={getHomePageRoute()} element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
