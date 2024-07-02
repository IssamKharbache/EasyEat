import { useNavigate, useSearchParams } from "react-router-dom";
import classes from "./verify.module.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "sonner";
import { useEffect } from "react";
import LoadingEffect from "../../components/loadingeffect/LoadingEffect";
const Verify = () => {
  const navigate = useNavigate();
  //states
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { baseUrl } = useContext(StoreContext);

  const verifyPayment = async () => {
    const res = await axios.post(baseUrl + "/api/order/verify-order", {
      success,
      orderId,
    });
    if (res.data.success) {
      navigate("/my-orders");
      toast.success("Payment successful", { position: "top-center" });
    } else {
      navigate("/");
      toast.error("Payment Failed, please try again", {
        position: "top-center",
      });
    }
  };

  //effect
  useEffect(() => {
    verifyPayment();
  }, []);
  return <LoadingEffect />;
};

export default Verify;
