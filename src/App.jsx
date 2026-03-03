import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Adminpanel from './Pages/Adminpanel'
import BlogReader from './Pages/BlogReader'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blogs/:slug" element={<BlogReader />} />
        <Route path="/admin/*" element={<Adminpanel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
