import { assets } from "../../assets/assets";
import AppDownload from "../mobileappDownload/AppDownload";
//social icons

import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={classes.footer} id="footer">
      <div className={classes.footerContent}>
        <div className={classes.footerContentLeft}>
          <img src={assets.logo} className={classes.footerLogo} alt="Easyeat" />
          <p>
            Welcome to EasyEat, your go-to food delivery service! Explore our
            app, order delicious meals, and enjoy hassle-free deliveries. Need
            help? Contact us at support@easyeat.com or visit our FAQs. Follow us
            on social media for updates and special offers
          </p>
          <AppDownload />
        </div>
        <div className={classes.footerContentCenter}>
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className={classes.footerContentRight}>
          <h2>Get in touch</h2>
          <ul>
            <li>+212689742597</li>
            <li>contact@easyeat.com</li>
          </ul>
          <div className={classes.footerIcon}>
            {assets.socialIcon.map((icon, idx) => {
              const Icon = icon;
              return <Icon className={classes.footerSocialIcon} key={idx} />;
            })}
          </div>
        </div>
      </div>
      <hr />
      <p className={classes.footerCopyright}>
        Copyright © Easy Eat all right reserved
      </p>
      <p>Built by <a href="https://kharbache.vercel.app/">Issam Kharbache<</a>/p>
    </div>
  );
};

export default Footer;
