import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from "axios";
const StoreContextProvider = (props) => {
  //handling cart
  const [cartItems, setCartItems] = useState({});
  const baseUrl = "https://easyeat.onrender.com";
  const [token, setToken] = useState("");
  const [foodList, setFoodList] = useState([]);
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        baseUrl + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        baseUrl + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };
  //calculate total amount of cart
  const getTotalCartAmount = () => {
    let totalAmout = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        totalAmout += itemInfo.price * cartItems[item];
      }
    }
    return totalAmout;
  };
  //get token from local storage
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();

      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  //fetch foodlist from database
  const fetchFoodList = async () => {
    const response = await axios.get(baseUrl + "/api/food/list");
    setFoodList(response.data.data);
  };

  //load cart data

  const loadCartData = async (token) => {
    const res = await axios.post(
      baseUrl + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(res.data.cartData);
  };
  //values
  const contextValue = {
    foodList,
    setCartItems,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    baseUrl,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
