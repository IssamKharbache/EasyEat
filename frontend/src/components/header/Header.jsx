import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.headerContents}>
        <h2>Order your food now</h2>
        <p>
          From hearty comfort food to exotic dishes, our app allows you to
          explore extensive menus, customize orders, and enjoy convenient
          delivery or pickup services.
        </p>
        <a className={classes.button} href="#explore-menu">
          View Menu
          <FaArrowRightLong />
        </a>
      </div>
    </div>
  );
};

export default Header;
