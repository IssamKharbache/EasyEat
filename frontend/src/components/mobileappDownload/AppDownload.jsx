import classes from "./AppDownload.module.css";
//images
import playstore from "../../../public/assets/appdownload/playstore.png";
import appstore from "../../../public/assets/appdownload/appstore.png";
const AppDownload = () => {
  return (
    <div className={classes.AppDownload} id="app-download">
      <div className={classes.appDownloadPlatforms}>
        <h2>Download our app</h2>
        <div className={classes.platformImages}>
          <img
            src={playstore}
            className={classes.playstoreImg}
            alt="play store app"
          />
          <img
            src={appstore}
            className={classes.appstoreImg}
            alt="app store app"
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
