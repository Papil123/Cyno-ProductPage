import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { useEffect } from 'react'
import { useState } from 'react'
import Main from './Pages/Main'

const MainRoutes = () => {
    const [ isAuth, setIsAuth] = useState(false)
    useEffect(()=>{
        setIsAuth(JSON.parse(localStorage.getItem("isAuth")))
    },[])
// console.log(isAuth)
  return (
    <div>
        <Routes>
            {/* <Route path='/home' element={<Home/>} /> */}
            <Route path='/' element={<Main/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
        </Routes>
    </div>
  )
}

export default MainRoutes