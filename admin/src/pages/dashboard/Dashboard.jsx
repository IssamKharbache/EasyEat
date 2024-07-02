import { useEffect, useState } from "react";
import classes from "./dashboard.module.css";
import axios from "axios";

const Dashboard = ({ baseUrl }) => {
  const [data, setData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  //get orders function
  const getOrders = async () => {
    const res = await axios.get(baseUrl + "/api/order/list");
    setData(res.data.data);
  };
  useEffect(() => {
    getOrders();
    getUsers();
  }, []);
  //calculating the total earning number
  const amountArray = data.map((order) => order.amount);
  let totalEarning = 0;
  for (let i = 0; i < amountArray.length; i++) {
    totalEarning += amountArray[i];
  }
  //
  //get users function

  const getUsers = async () => {
    const res = await axios.get(baseUrl + "/api/user/users");
    setUsersData(res.data.data);
  };

  //stats data
  const analytics = [
    {
      id: 1,
      title: "Total orders",
      amount: data.length,
    },
    { id: 2, title: "Total earnings", amount: totalEarning },
    { id: 3, title: "Total customers", amount: usersData.length },
  ];
  return (
    <div className={classes.dashboard}>
      <h1>Analytics</h1>
      <div className={classes.container}>
        {analytics.map((analytic, idx) => {
          return (
            <div
              key={idx}
              className={
                analytic.id === 1
                  ? classes.statisticFirstItem
                  : analytic.id === 2
                  ? classes.statisticSecondItem
                  : classes.statisticThirdItem
              }
            >
              <h1>{analytic.title}</h1>
              <p>
                {analytic.title === "Total earnings"
                  ? `$${analytic.amount}.00`
                  : analytic.amount}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
