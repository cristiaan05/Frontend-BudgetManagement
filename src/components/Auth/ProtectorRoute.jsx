import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectorRoute = ({children}) => {
    const isAuth = localStorage.getItem('usertoken');

    if(!isAuth){
        return <Navigate to='/'/>
    }

  return (
    <>{ children }</>
  )
}

export default ProtectorRoute;