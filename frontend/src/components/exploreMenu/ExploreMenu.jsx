import classes from "./ExploreMenu.module.css";
import { menu_list } from "../../assets/assets";
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className={classes.exploreMenu} id="explore-menu">
      <h1>Explore the menu</h1>
      <p className={classes.exploreMenuText}>
        Discover a tantalizing array of dishes from our curated selection of top
        restaurants and eateries. Whether you're craving familiar comfort foods
        or eager to explore new tastes, our diverse menu has something for
        everyone. Browse through appetizing starters, mouthwatering mains, and
        irresistible desserts
      </p>
      <div className={classes.exploreMenuList}>
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_image ? "All" : item.menu_name
                )
              }
              key={index}
              className={classes.exploreMenuListItem}
            >
              <img
                className={category === item.menu_name ? classes.active : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p
                className={
                  category === item.menu_name ? classes.textActive : ""
                }
              >
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
