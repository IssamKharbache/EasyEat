//css
import classes from "./NavBar.module.css";
//logo
import logo from "../../../public/assets/logo.png";
//icons
import { GoSearch } from "react-icons/go";
import { GiShoppingCart } from "react-icons/gi";
import { HiOutlineUser } from "react-icons/hi2";
import { RiShoppingBag4Line } from "react-icons/ri";
import { GoSignOut } from "react-icons/go";

//
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";

const NavBar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  ///states
  const [menu, setMenu] = useState("");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  //handle open menuj state
  const [open, setIsOpen] = useState(false);

  open
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");
  //
  //logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  //redirect function
  const redirectFunction = (url) => {
    navigate(url);
  };
  return (
    <div className={classes.navbar}>
      <Link to="/">
        <img src={logo} alt="Logo" className={classes.logo} />
      </Link>

      <ul className={classes.navbarMenu}>
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" || menu === "" ? classes.active : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? classes.active : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? classes.active : ""}
        >
          Download app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? classes.active : ""}
        >
          Contact us
        </a>
        <a
          href="#reviews"
          onClick={() => setMenu("reviews")}
          className={menu === "reviews" ? classes.active : ""}
        >
          Reviews
        </a>
      </ul>
      <div className={classes.navbarRight}>
        <GoSearch className={classes.icons} />
        <div className={classes.navbarSearchIcon}>
          <Link to="/cart">
            <GiShoppingCart className={classes.icons} />
          </Link>

          <div className={getTotalCartAmount() > 0 ? classes.dot : ""}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)} className={classes.button}>
            Sign in
          </button>
        ) : (
          <div className={classes.navbarProfile}>
            <HiOutlineUser />
            <ul className={classes.navProfileDropDown}>
              <li onClick={() => redirectFunction("/my-orders")}>
                <RiShoppingBag4Line className={classes.icon} />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={() => logout()}>
                <GoSignOut className={classes.icon} />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* responsive menu */}

      <div className={classes.respMenu}>
        {!open ? (
          <CiMenuBurger
            onClick={() => setIsOpen(true)}
            className={classes.burgerIcon}
          />
        ) : (
          <IoCloseOutline
            onClick={() => setIsOpen(false)}
            className={classes.burgerIcon}
          />
        )}

        {open ? (
          <ul className={`${classes.menuList} `}>
            <Link onClick={() => setIsOpen(false)} to="/">
              Home
            </Link>
            <a onClick={() => setIsOpen(false)} href="#explore-menu">
              Menu
            </a>
            <a onClick={() => setIsOpen(false)} href="#app-download">
              Download app
            </a>
            <a onClick={() => setIsOpen(false)} href="#footer">
              Contact us
            </a>
            <a onClick={() => setIsOpen(false)} href="#reviews">
              Reviews
            </a>
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NavBar;
