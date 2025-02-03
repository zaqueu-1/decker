import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import LifeCounter from "./pages/LifeCounter/LifeCounter"

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/life' element={<LifeCounter />} />
      <Route path='*' element={<Home />} />
    </Routes>
  )
}

export default App
