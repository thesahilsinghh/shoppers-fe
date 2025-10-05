
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './pages/authPages/Login'
import Signup from './pages/authPages/Signup'
// import { Route } from 'lucide-react'

function App() {

  return (
    <div className="min-h-screen  flex flex-row items-center justify-center bg-base-200 relative ">
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        
        
      </Routes>
    </div>
  )
}

export default App
