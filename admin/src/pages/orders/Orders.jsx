import { useState } from "react";
import classes from "./orders.module.css";
import { toast } from "sonner";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
const Orders = ({ baseUrl }) => {
  //states
  const [data, setData] = useState([]);
  //

  const [loading, setLoading] = useState(false);

  //function to get data
  const fetchData = async () => {
    const res = await axios.get(baseUrl + "/api/order/list");
    if (res.data.success) {
      setData(res.data.data);
    } else {
      toast.error("Something went wrong", { position: "top-center" });
    }
  };
  console.log(data);
  useEffect(() => {
    fetchData();
  }, []);

  //
  //order status handler
  const statusHandler = async (event, orderId) => {
    setLoading(true);
    const res = await axios.post(baseUrl + "/api/order/update-status", {
      orderId,
      status: event.target.value,
    });
    if (res.data.success) {
      setLoading(false);
      await fetchData();
      toast.success(res.data.message, { position: "top-center" });
    } else {
      toast.error("Something went wrong !");
      setLoading(false);
    }
  };
  return (
    <div className={`${classes.order} ${classes.add}`}>
      <h3>All orders</h3>
      <div className={classes.orderList}>
        {data.map((order, idx) => {
          return (
            <div key={idx} className={classes.orderItem}>
              <img src={assets.parcel} alt="" />
              <div>
                <p className={classes.orderItemFood}>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className={classes.orderItemName}>
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className={classes.orderItemAddress}>
                  <p> {order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p className={classes.orderItemPhone}>{order.address.phone}</p>
                <div>
                  {order.payment ? (
                    <p className={classes.done}>Payed</p>
                  ) : (
                    <p className={classes.undone}>Unpayed</p>
                  )}
                </div>
              </div>
              <p>Items : {order.items.length}</p>

              <p className={classes.price}>${order.amount}</p>
              {loading ? (
                <div className={classes.statusLoading}>
                  <p>Updating...</p>
                  <LoadingSpinner size={20} color="green" />
                </div>
              ) : (
                <select
                  className={classes.isActive}
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                >
                  <option value="Processing">Processing</option>
                  <option value="On delivering">On delivering</option>
                  <option value="Delivered">Delivered</option>
                </select>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
