import { useEffect, useState } from "react";
import classes from "./list.module.css";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

//icons
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
const List = () => {
  //
  const navigate = useNavigate();
  //
  const baseUrl = "http://localhost:4000";
  const [productList, setProductList] = useState([]);

  //loading handling state
  const [loading, setLoading] = useState(false);

  //get the data list

  const fetchProductList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/food/list`);
      if (response.data.success) {
        setProductList(response.data.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //delete product item
  const deleteProduct = async (productId) => {
    setLoading(true);
    const response = await axios.post(`${baseUrl}/api/food/delete`, {
      id: productId,
    });
    if (response.data.success) {
      setLoading(false);
      await fetchProductList();
      toast.success(response.data.message, { position: "top-center" });
    } else {
      setLoading(false);
      toast.error(response.data.message, { position: "top-center" });
    }
  };

  //getting data everytime the component is mounted
  useEffect(() => {
    fetchProductList();
  }, []);
  return (
    <div className={`${classes.list} ${classes.flexCol} ${classes.add}`}>
      <div className={classes.titleHeader}>
        <h2>All Products List</h2>
        {productList.length > 0 && (
          <button onClick={() => navigate("/add")}>Add products</button>
        )}
      </div>

      <div className={classes.listTable}>
        <div className={`${classes.listTableFormat} ${classes.title}`}>
          <b>Image</b>
          <b>Title</b>
          <b>Category</b>
          <b>Price</b>
          <b>Actions</b>
        </div>
        {productList.length > 0 ? (
          productList.map((product, index) => {
            return (
              <div className={classes.listTableFormat} key={index}>
                <img
                  src={`${baseUrl}/images/` + product.image}
                  alt={product.name}
                />
                <p>{product.name}</p>
                <p>{product.category}</p>
                <p>${product.price}</p>
                <div className={classes.actions}>
                  {loading ? (
                    <LoadingSpinner size={14} color="red" />
                  ) : (
                    <MdDelete
                      onClick={() => deleteProduct(product._id)}
                      className={classes.cursor}
                    />
                  )}
                  <AiFillEdit className={classes.edit} />
                </div>
              </div>
            );
          })
        ) : (
          <div className={classes.noItem}>
            <p>No items</p>
            <button onClick={() => navigate("/add")}>Add products</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
