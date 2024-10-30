import React from 'react'
import { Link } from 'react-router-dom'

const AppHeader = () => {
  return (
    <header>
        <Link to='/'>Fast React Pizza Co.</Link>
        <p>Ashish Mainali</p>
    </header>
  )
}

export default AppHeader