import { useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import MsgForm from './components/MsgForm'
import { Route, Routes } from "react-router-dom"
import './App.css'

function App() {


  return (
    <Routes>
    <Route path="/" element={<Hero />} />
    <Route path="/msg" element={<MsgForm />} />
  </Routes>
  )
}

export default App