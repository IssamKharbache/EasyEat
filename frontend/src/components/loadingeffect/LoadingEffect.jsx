import classes from "./loading.module.css";
const LoadingEffect = () => {
  return (
    <div className={classes.verify}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default LoadingEffect;
