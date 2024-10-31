import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, getCart, getTotalCartPrice } from "../../store/cartSlice";
import { formatCurrency, isValidPhone } from "../../utils/helpers";
import EmptyCart from "../cart/EmptyCart";
import appStore from "../../store/appStore";
import { useState } from "react";
import { fetchAddress } from "../../store/userSlice";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.1 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const userFullName = useSelector((state) => state.user.userName);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      {/* <Form method="POST" action='/order/new'> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Full Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              defaultValue={userFullName}
              className="input w-full"
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-lg bg-red-100 p-2 text-xs text-red-800">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              disabled={isLoadingAddress}
              type="text"
              name="address"
              defaultValue={address}
              className="input w-full"
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-lg bg-red-100 p-2 text-xs text-red-800">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="sm:right[3px] sm:top[5px] absolute right-[5px] top-[5px] z-10">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="my-2 h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div className="my-2">
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Placing Order.."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  // console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "Please enter a valid phone number.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  // DO NOT OVER USE
  appStore.dispatch(emptyCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
