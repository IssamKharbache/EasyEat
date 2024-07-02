import { useContext, useEffect, useState } from "react";
import classes from "./PlaceOrders.module.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "sonner";
import LoadingSpinner from "../../components/loadingspinner/LoadingSpinner";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, cartItems, token, foodList, baseUrl } =
    useContext(StoreContext);

  //
  const [loading, setLoading] = useState(false);
  //
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    phone: "",
    state: "",
  });

  //on change handler
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  //submit payment
  const placeOrder = async (event) => {
    setLoading(true);
    event.preventDefault();
    let orderItems = [];
    //adding item data to order items array
    foodList.map((item) => {
      if (cartItems[item._id]) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryCost,
    };

    let response = await axios.post(
      baseUrl + "/api/order/place-order",
      orderData,
      { headers: { token } }
    );
    if (response.data.success) {
      setLoading(false);
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      toast.error("Something went wrong");
      setLoading(true);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
      toast.info("You must be logged in to place an order", {
        position: "top-center",
      });
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);
  const deliveryCost = getTotalCartAmount() === 0 ? 0 : 4;
  return (
    <form onSubmit={placeOrder} className={classes.placeOrder}>
      <div className={classes.placeOrderLeft}>
        <p className={classes.title}>Delivery Details</p>
        <div className={classes.multiFields}>
          <input
            required
            onChange={onChangeHandler}
            value={data.firstName}
            name="firstName"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            value={data.lastName}
            name="lastName"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          value={data.email}
          name="email"
          type="text"
          placeholder="Email address"
        />
        <input
          required
          type="text"
          onChange={onChangeHandler}
          value={data.street}
          name="street"
          placeholder="Street address"
        />
        <div className={classes.multiFields}>
          <input
            required
            onChange={onChangeHandler}
            value={data.city}
            name="city"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            value={data.state}
            name="state"
            type="text"
            placeholder="State"
          />
        </div>
        <div className={classes.multiFields}>
          <input
            required
            type="text"
            onChange={onChangeHandler}
            value={data.zipcode}
            name="zipcode"
            placeholder="Zip code"
          />
          <input
            required
            onChange={onChangeHandler}
            value={data.country}
            name="country"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          type="text"
          onChange={onChangeHandler}
          value={data.phone}
          name="phone"
          placeholder="Phone number"
        />
      </div>
      <div className={classes.placeOrderRight}>
        <div className={classes.cartTotal}>
          <h2>Cart Total</h2>
          <div>
            <div className={classes.cartTotalDetails}>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className={classes.cartTotalDetails}>
              <p>Delivery cost</p>
              <p>${deliveryCost}</p>
            </div>
            <hr />
            <div className={classes.cartTotalDetails}>
              <b>Total</b>
              <b>${getTotalCartAmount() + deliveryCost}</b>
            </div>
          </div>
          {loading ? (
            <button type="submit" className={classes.loadingButton}>
              <LoadingSpinner size={30} />
            </button>
          ) : (
            <button type="submit">Proceed to payment</button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrderPage;
