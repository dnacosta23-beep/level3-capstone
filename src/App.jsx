import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Library from './pages/Library'
import CurrentReads from './pages/CurrentReads'
import ToRead from './pages/ToRead'


function App() {


  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/library' element={<Library />} />
        <Route path='/current-reads' element={<CurrentReads />} />
        <Route path='/to-read' element={<ToRead />} />  
       
      </Routes>
    </BrowserRouter>
  )
}

export default App

