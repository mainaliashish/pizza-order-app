import React from 'react'
import AppHeader from './AppHeader'
import CartOverview from '../features/cart/CartOverview'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <AppHeader/>
        <main>
            <h1>Content</h1>
            <Outlet/>
        </main>
        <CartOverview/>
    </div>
  )
}

export default AppLayout