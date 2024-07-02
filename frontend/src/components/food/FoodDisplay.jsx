import { useContext } from "react";
import classes from "./Food.module.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "./fooditem/FoodItem";
const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);

  return (
    <div className={classes.foodDisplay} id="food-display">
      <h2>Top dishes</h2>
      <div className={classes.foodDisplayList}>
        {foodList.length > 0 &&
          foodList.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default FoodDisplay;
