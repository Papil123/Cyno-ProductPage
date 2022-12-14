import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { useRecoilState } from 'recoil'
import { IsAuthState } from './Atom'
import { useEffect } from 'react'
import { useState } from 'react'

const MainRoutes = () => {
    const [ isAuth, setIsAuth] = useState(false)
    useEffect(()=>{
        setIsAuth(JSON.parse(localStorage.getItem("isAuth")))
    })
console.log(isAuth)
  return (
    <div>
        <Routes>
            <Route path='/' element={isAuth===true? <Home/>:<Login/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
        </Routes>
    </div>
  )
}

export default MainRoutes