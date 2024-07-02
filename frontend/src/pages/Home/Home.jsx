import { useState } from "react";
import ExploreMenu from "../../components/exploreMenu/ExploreMenu";
import Header from "../../components/header/Header";
import classes from "./Home.module.css";
import FoodDisplay from "../../components/food/FoodDisplay";
import Reviews from "../../components/reviews/Reviews";
const HomePage = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <Reviews />
    </div>
  );
};

export default HomePage;
