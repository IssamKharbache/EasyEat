import { useContext, useEffect, useState } from "react";
import classes from "./LoginModal.module.css";
import axios from "axios";
//icons
import { IoCloseCircleOutline } from "react-icons/io5";
import { StoreContext } from "../../context/StoreContext";
import LoadingSpinner from "../../../../admin/src/components/spinner/LoadingSpinner";
import { toast } from "sonner";

const LoginModal = ({ setShowLogin }) => {
  const [currentAuthOption, setCurrentAuthOption] = useState("login");
  const { baseUrl, setToken } = useContext(StoreContext);
  //
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  //handling data states
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  //handling onchange function
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  //login user function

  const authenticate = async (e) => {
    setLoading(true);
    e.preventDefault();
    let newUrl = baseUrl;
    if (currentAuthOption === "login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setLoading(false);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      toast.success(
        currentAuthOption === "login"
          ? "You have been logged in successfully"
          : "You have been registred successfully",
        { position: "top-center" }
      );
      setErrors("");
    } else {
      setLoading(false);
      setErrors(response.data.message);
    }
  };

  return (
    <div className={classes.loginModal}>
      <form onSubmit={authenticate} className={classes.loginModalContainer}>
        <div className={classes.loginModalTitle}>
          <h2>{currentAuthOption === "signup" ? "Sign up" : "Login"}</h2>
          <IoCloseCircleOutline
            className={classes.closeIcon}
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className={classes.loginModalInputs}>
          {errors && (
            <div className={classes.errorContainer}>
              <p>{errors}</p>
            </div>
          )}
          {currentAuthOption === "login" ? (
            <> </>
          ) : (
            <input
              type="text"
              name="fullName"
              value={data.fullName}
              onChange={onChangeHandler}
              placeholder="Enter your full name"
              required
            />
          )}
          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Enter your email address"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        {loading ? (
          <button className={classes.loadingButton} type="submit">
            {currentAuthOption === "signup"
              ? "creating an account please wait..."
              : "Logging you in please wait..."}
            <LoadingSpinner size={20} />
          </button>
        ) : (
          <button type="submit">
            {currentAuthOption === "signup" ? "Create account" : "Login"}
          </button>
        )}

        {currentAuthOption === "signup" && (
          <div className={classes.loginModalCondition}>
            <input type="checkbox" required />
            <p>I agree to the terms of use & privacy policy</p>
          </div>
        )}
        {currentAuthOption === "login" ? (
          <p>
            You don't have an account ?{" "}
            <span onClick={() => setCurrentAuthOption("signup")}>Sign up</span>
          </p>
        ) : (
          <p>
            Already have an account ?{" "}
            <span onClick={() => setCurrentAuthOption("login")}>Login</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginModal;
