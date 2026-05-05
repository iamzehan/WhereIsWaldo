import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import Game from "./pages/Game";
import Home from "./pages/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/:level" element={<Game/>}/>
      </Route>
    </Routes>
  )
}

export default App
