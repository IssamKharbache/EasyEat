import userModel from "../models/userModel.js";

//add items to cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item added to cart",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error while adding item to cart",
    });
  }
};

//remove items from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error while removing item from cart",
    });
  }
};

//get cart items
const getCartItems = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({
      success: true,
      cartData: cartData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server while getting cart data",
    });
  }
};

export { addToCart, removeFromCart, getCartItems };
