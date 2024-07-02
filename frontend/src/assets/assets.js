import dessert from "../../public/assets/menu/dessert.jpeg";
import salad from "../../public/assets/menu/salad.jpg";
import sandwich from "../../public/assets/menu/sandwich.jpg";
import pasta from "../../public/assets/menu/pasta.jpg";
import noodles from "../../public/assets/menu/noodles.jpg";
import cake from "../../public/assets/menu/cake.jpg";
import pizza from "../../public/assets/menu/pizza.jpg";
import ordersIcon from "./ordersicon.png";
import noOrders from "./noordersyet.png";
//logo
import Logo from "../../public/assets/logo.png";
//social icons
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
export const menu_list = [
  {
    menu_name: "Salad",
    menu_image: salad,
  },
  {
    menu_name: "Desserts",
    menu_image: dessert,
  },
  {
    menu_name: "Pasta",
    menu_image: pasta,
  },
  {
    menu_name: "Noodles",
    menu_image: noodles,
  },
  {
    menu_name: "Cake",
    menu_image: cake,
  },
  {
    menu_name: "Sandwiches",
    menu_image: sandwich,
  },
  {
    menu_name: "Pizza",
    menu_image: pizza,
  },
];

export const foodList = [
  {
    _id: "1",
    name: "Greek salad",
    image: salad,
    price: 12,
    description:
      "Food provides essential services for the Greek community and provides  services for the community to provide services",
    category: "Salad",
  },
  {
    _id: "2",
    name: "Spaguetti",
    image: pasta,
    price: 28,
    description:
      "Food provides essential services for the Greek community and provides  services for the community to provide services",
    category: "Pasta",
  },
  {
    _id: "3",
    name: "Spaguetti",
    image: pasta,
    price: 28,
    description:
      "Food provides essential services for the Greek community and provides  services for the community to provide services",
    category: "Pasta",
  },
  {
    _id: "4",
    name: "Spaguetti",
    image: pasta,
    price: 28,
    description:
      "Food provides essential services for the Greek community and provides  services for the community to provide services",
    category: "Pasta",
  },
  {
    _id: "5",
    name: "Spaguetti",
    image: pasta,
    price: 28,
    description:
      "Food provides essential services for the Greek community and provides  services for the community to provide services",
    category: "Pasta",
  },
];

export const assets = {
  logo: Logo,
  socialIcon: [FaInstagram, FaFacebookF, BsTwitterX],
  ordersIcon,
  noOrders,
};
