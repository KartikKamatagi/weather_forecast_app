import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar1 from './Components/NavBar1'
import Weather from './Components/Weather'

function App() {
  return (
    <BrowserRouter>
      <NavBar1 />

      <Routes>
        
        <Route path="/" element={<Weather />} />

        {/* explicit weather route */}
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App



//33b038d69da9f285e48819a6af27caf2 
///https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
