import { useContext, useEffect, useState } from "react";
import classes from "./myorders.module.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "sonner";
import LoadingEffect from "../../components/loadingeffect/LoadingEffect";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
const MyOrders = () => {
  const { baseUrl, token } = useContext(StoreContext);
  //state to handle order data
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  //get data function

  const getOrderData = async () => {
    setLoading(true);
    const res = await axios.post(
      baseUrl + "/api/order/orders-list",
      {},
      { headers: { token } }
    );
    if (res.data.success) {
      setLoading(false);
      setOrderData(res.data.data);
    } else {
      setLoading(false);
      toast.error("Error while getting orders,contact the support team");
    }
  };
  useEffect(() => {
    if (token) {
      getOrderData();
    }
  }, [token]);
  return (
    <div>
      {loading ? (
        <LoadingEffect />
      ) : (
        <div className={classes.myOrders}>
          <h2>My orders</h2>
          {orderData.length > 0 ? (
            <div className={classes.container}>
              {orderData?.map((order, index) => {
                return (
                  <div className={classes.myOrdersItem} key={index}>
                    <img src={assets.ordersIcon} alt="order icon" />
                    <p>
                      {order.items.map((item, idx) => {
                        if (idx === order.items.length - 1) {
                          return item.name + " x " + item.quantity;
                        } else {
                          return item.name + " x " + item.quantity + ", ";
                        }
                      })}
                    </p>
                    <p>${order.amount}.00</p>
                    <p>Items : {order.items.length}</p>
                    <p>
                      <span>&#x25cf;</span>
                      <b>{order.status}</b>
                    </p>
                    <button onClick={getOrderData}>Track order</button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={classes.noOrders}>
              <img src={assets.noOrders} alt="No orders yet" />
              <p>No orders yet</p>
              <button onClick={() => navigate("/")}>Start ordering</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
