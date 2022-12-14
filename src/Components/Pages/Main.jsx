import React from 'react'
import Home from './Home'
import Login from './Login'

const Main = () => {

    let isAuth = localStorage.getItem("isAuth")
  return (
    <div>
        {isAuth?<Home/>:<Login/>}
    </div>
    
  )
}

export default Main