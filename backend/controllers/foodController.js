import foodModel from "../models/foodModel.js";

import fs from "fs";

//add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  //getting body values
  const { name, description, price, category } = req.body;

  //creating new food item
  const food = new foodModel({
    name,
    description,
    category,
    price,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({
      success: true,
      message: "Food item added successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error trying to create food item",
    });
  }
};

//get food list

const foodList = async (req, res) => {
  try {
    const foodList = await foodModel.find({});
    res.json({
      success: true,
      data: foodList,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error while trying to get the food list",
    });
  }
};

//delete food item
const deleteFood = async (req, res) => {
  try {
    const isfoodExisting = await foodModel.findById(req.body.id);

    if (!isfoodExisting) {
      return res.json({
        success: false,
        message: "Food item not found",
      });
    }
    //deleting the image when deleting the food item
    fs.unlink(`uploads/${isfoodExisting.image}`, () => {});
    //deleting item
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({
      success: true,
      message: "Food product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error while deleting food item",
    });
  }
};
export { addFood, foodList, deleteFood };
