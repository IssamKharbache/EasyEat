import { useContext } from "react";
import classes from "./FoodItem.module.css";
//icons
import { CiStar } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { IoIosRemove } from "react-icons/io";
import { StoreContext } from "../../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, baseUrl } =
    useContext(StoreContext);

  return (
    <div className={classes.foodItem}>
      <div className={classes.foodItemImgContainer}>
        <img
          className={classes.foodItemImage}
          src={`${baseUrl}/images/${image}`}
          alt={name}
        />
        {!cartItems[id] ? (
          <GoPlus
            size={10}
            className={classes.add}
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className={classes.foodItemCounter}>
            <IoIosRemove
              className={classes.minusIcon}
              onClick={() => removeFromCart(id)}
            />
            <p>{cartItems[id]}</p>
            <GoPlus
              className={classes.plusIcon}
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
      <div className={classes.foodItemInfo}>
        <div className={classes.foodItemNameRating}>
          <p>{name}</p>
          <CiStar />
        </div>
        <p className={classes.foodItemDescription}>{description}</p>
        <p className={classes.foodItemPrice}>${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
