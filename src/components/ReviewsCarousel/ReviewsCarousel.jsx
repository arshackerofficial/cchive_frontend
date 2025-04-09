import React, { useState, useEffect } from "react";
import styles from "./ReviewsCarousel.module.css";

function ReviewsCarousel({
  title = "What Students Say",
  subText = "", // Optional subheading or intro text
  reviews = [], // Array of review objects or strings
  autoSlideInterval = 3000, // Time in ms before moving to the next review
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // If there are no reviews or only one, no need to slide
    if (reviews.length < 2) return;

    const slideTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, autoSlideInterval);

    // Cleanup the interval on component unmount
    return () => clearInterval(slideTimer);
  }, [reviews, autoSlideInterval]);

  return (
    <section className={styles["reviews-carousel-section"]}>
      <div className={styles["reviews-carousel-header"]}>
        <h2 className={styles["reviews-carousel-title"]}>{title}</h2>
        {subText && (
          <p className={styles["reviews-carousel-subtext"]}>{subText}</p>
        )}
      </div>

      <div className={styles["carousel-container"]}>
        <div
          className={styles["carousel-inner"]}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review, index) => (
            <div className={styles["carousel-slide"]} key={index}>
              <blockquote className={styles["review-quote"]}>
                {review.text}
              </blockquote>
              {review.author && (
                <span className={styles["review-author"]}>
                  - {review.author}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsCarousel;
