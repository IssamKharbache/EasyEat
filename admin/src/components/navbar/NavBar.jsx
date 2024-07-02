import { assets } from "../../assets/assets";
import classes from "./Navbar.module.css";

const NavBar = () => {
  return (
    <div className={classes.navbar}>
      <img src={assets.logo} className={classes.logo} alt="EasyEat" />

      <img src={assets.profile} alt="user avatar" className={classes.profile} />
    </div>
  );
};

export default NavBar;
