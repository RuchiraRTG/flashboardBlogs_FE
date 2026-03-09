import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Homepage from './Pages/Homepage'
import Adminpanel from './Pages/Adminpanel'
import BlogReader from './Pages/BlogReader'

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blogs/:slug" element={<BlogReader />} />
          <Route path="/admin/*" element={<Adminpanel />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
