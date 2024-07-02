import classes from "./Reviews.module.css";
//images
import firstPerson from "../../../public/assets/reviews/person1.png";
import secondPeron from "../../../public/assets/reviews/person2.jpg";
import thirdPerson from "../../../public/assets/reviews/person3.jpg";
import stars from "../../../public/assets/reviews/starrating.png";
const reviews = [
  {
    clientName: "Sarah Jamel",
    description:
      "Fast and reliable service! Love the variety of restaurants available. Ordering is super easy!",
    image: secondPeron,
  },
  {
    clientName: "Mark Delight",
    description:
      "App interface is user-friendly, deliveries are always on time. Great experience overall!",
    image: firstPerson,
  },
  {
    clientName: "Emily Sarah",
    description:
      "Excellent customer support and timely updates on order status. Makes food delivery hassle-free!",
    image: thirdPerson,
  },
];
const Reviews = () => {
  return (
    <div className={classes.review} id="reviews">
      <h2>What people think of EasyEat</h2>
      <hr />
      <div className={classes.card}>
        {reviews.map((review, idx) => {
          return (
            <div key={idx} className={classes.cardItem}>
              <img src={review.image} className={classes.cardImage} alt="" />
              <h4>{review.clientName}</h4>
              <img src={stars} className={classes.ratingImg} alt="" />
              <p>{review.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
