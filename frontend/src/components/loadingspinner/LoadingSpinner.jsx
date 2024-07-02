import { ClipLoader } from "react-spinners";
const LoadingSpinner = ({ color, size }) => {
  return <ClipLoader color={color ? color : "#fafafa"} size={size} />;
};

export default LoadingSpinner;
