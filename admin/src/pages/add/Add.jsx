import { useState } from "react";
import { assets } from "../../assets/assets";
import classes from "./add.module.css";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Add = ({ baseUrl }) => {
  //
  const navigate = useNavigate();
  //handle image state
  const [image, setImage] = useState(false);
  //handling loading
  const [loading, setLoading] = useState(false);
  //handle the form data
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Pasta",
  });
  //handler onchange function
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  //submit data to the backend
  const submitHandler = async (e) => {
    e.preventDefault();
    //adding the form data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    //send data to the api
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/food/add`, formData);
      if (response.data.success) {
        setLoading(false);
        //reseting the field values
        setData({ name: "", description: "", price: "", category: "Pasta" });
        setImage(false);
        toast.success("Product added successfully", { position: "top-center" });
        //redirecting to the list page
        navigate("/list");
      } else {
        toast.error(response.data.message, {
          position: "top-center",
        });
      }
    } catch (error) {}
  };
  return (
    <div className={classes.add}>
      <h1>Add product</h1>
      <form className={classes.flexCol} onSubmit={submitHandler}>
        <div className={`${classes.addItemName} ${classes.flexCol}`}>
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type the product name here"
          />
        </div>
        <div className={`${classes.addItemDescription} ${classes.flexCol}`}>
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="7"
            placeholder="Type the product description"
            required
          />
        </div>
        <div className={classes.addCategoryPrice}>
          <div className={`${classes.addCategory} ${classes.flexCol}`}>
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Pasta">Pasta</option>
              <option value="Salad">Salad</option>
              <option value="Sandwiches">Sandwiches</option>
              <option value="Cake">Cake</option>
              <option value="Desserts">Desserts</option>
              <option value="Noodles">Noodles</option>
              <option value="Pizza">Pizza</option>
            </select>
          </div>
          <div className={`${classes.addPrice} ${classes.flexCol}`}>
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$25"
              min={0}
            />
          </div>
        </div>
        <div className={`${classes.addImgUpload} ${classes.flexCol}`}>
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload}
              alt="product image"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        {loading ? (
          <button type="button" className={classes.loadingButton}>
            Adding product please wait...
            <LoadingSpinner color="#ffffff" size={20} />
          </button>
        ) : (
          <button type="submit" className={classes.submitButton}>
            Add product
          </button>
        )}
      </form>
    </div>
  );
};

export default Add;
