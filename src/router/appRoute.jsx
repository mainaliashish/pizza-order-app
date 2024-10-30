import { createBrowserRouter } from "react-router-dom"
import AppLayout from "../ui/AppLayout"
import Home from "../ui/Home"
import Menu from "../features/menu/Menu"
import Cart from "../features/cart/Cart"
import CreateOrder from "../features/order/CreateOrder"
import Order from "../features/order/Order"

export const appRouter = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/menu',
        element: <Menu />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/order/new',
        element: <CreateOrder />
      },
      {
        path: '/order/:orderId',
        element: <Order />
      }
    ]
  },
]);