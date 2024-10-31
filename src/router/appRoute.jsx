import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../ui/AppLayout";
import Home from "../ui/Home";
import Error from "../ui/Error";
import Menu, { loader as menuLoader } from "../features/menu/Menu";
import Cart from "../features/cart/Cart";
import CreateOrder, { action as creatOrderAction } from "../features/order/CreateOrder";
import { action as updateOrderAction } from "../features/order/UpdateOrder";
import Order, { loader as orderLoader } from "../features/order/Order";

export const appRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: creatOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);
