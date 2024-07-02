//css module
import { useContext } from "react";
import classes from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { MdDelete } from "react-icons/md";
const CartPage = () => {
  const { cartItems, foodList, removeFromCart, getTotalCartAmount, baseUrl } =
    useContext(StoreContext);

  const deliveryCost = getTotalCartAmount() === 0 ? 0 : 4;

  //
  const navigate = useNavigate();

  return (
    <div className={classes.cart}>
      <div className={classes.cartItemsClass}>
        <div className={classes.cartItemsTitle}>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div
                  className={`${classes.cartItemsTitle} ${classes.cartItemsItem}`}
                >
                  <img
                    src={`${baseUrl}/images/${item.image}`}
                    alt={item.title}
                  />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <MdDelete
                    onClick={() => removeFromCart(item._id)}
                    className={classes.deleteIcon}
                  />
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className={classes.cartBottom}>
        <div className={classes.couponCode}>
          <div className="">
            <p>If you have a coupon code , Enter it here</p>
            <div className={classes.cartCouponCodeInput}>
              <input type="text" placeholder="XMAS15-87954-89" />
              <button>Submit</button>
            </div>
          </div>
        </div>
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
          <button onClick={() => navigate("/order")}>
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
