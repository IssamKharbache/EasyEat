import { assets } from "../../assets/assets";
import classes from "./SideBar.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
const SideBar = () => {
  //getting current pathname
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarOptions}>
        <NavLink
          to="/"
          className={
            pathname === "/"
              ? `${classes.active} ${classes.sidebarOption}`
              : classes.sidebarOption
          }
        >
          <img
            src={assets.dashboardicon}
            alt="dashboard"
            className={classes.icon}
          />
          <p>Dashboard</p>
        </NavLink>
        <NavLink
          to="/add"
          className={
            pathname === "/add"
              ? `${classes.active} ${classes.sidebarOption}`
              : classes.sidebarOption
          }
        >
          <img src={assets.addicon} alt="add" className={classes.icon} />
          <p>Add products</p>
        </NavLink>
        <NavLink
          to="/list"
          className={
            pathname === "/list"
              ? `${classes.active} ${classes.sidebarOption}`
              : classes.sidebarOption
          }
        >
          <img src={assets.itemlisticon} alt="add" className={classes.icon} />
          <p>Products list</p>
        </NavLink>
        <NavLink
          to="/orders"
          className={
            pathname === "/orders"
              ? `${classes.active} ${classes.sidebarOption}`
              : classes.sidebarOption
          }
        >
          <img className={classes.icon} src={assets.parcel} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
