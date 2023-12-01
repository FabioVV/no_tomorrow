import React from 'react'
import Navbar from '../components/nav'

export default function DefaultPage(props) {

  return (
   <>
    <Navbar/>
    {props.children}
   </>
  )
  
}