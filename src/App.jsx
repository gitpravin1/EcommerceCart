import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home';
import CartDetails from './components/CartDetails'
import {Routes, Route } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';




function App() {
 

  return (
    <>
   <Header/>
   <Routes>
    <Route  path='/' element={<Home/>}/>
    <Route  path='/cart' element={<CartDetails/>}/>
   </Routes>
   <Toaster />
   
    </>
  )
}

export default App
