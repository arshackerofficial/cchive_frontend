import { Link } from "react-router-dom";
import styles from "./ReviewsPage.module.css";
import instructorImg from "../assets/instructor_300x200.png";
import courseImg from "../assets/course_300x200.png";

export default function ReviewsPage() {
  return (
    <div className={styles.pageWrapper}>
      <section className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Reviews & Ratings</h1>
        <p className={styles.pageSubtitle}>
          Share your experience and help your peers make smarter choices.
        </p>
      </section>

      <section className={styles.optionsSection}>
        <div className={styles.optionCard}>
          <img
            src={instructorImg}
            alt="Instructor Review"
            className={styles.cardImage}
          />
          <h2 className={styles.cardTitle}>Instructor Reviews</h2>
          <p className={styles.cardText}>
            Share feedback about an instructor's teaching style,
            approachability, and support.
          </p>
          <Link to="/instructors" className={styles.cardButton}>
            Review an Instructor
          </Link>
        </div>

        <div className={styles.optionCard}>
          <img
            src={courseImg}
            alt="Course Review"
            className={styles.cardImage}
          />
          <h2 className={styles.cardTitle}>Course Reviews</h2>
          <p className={styles.cardText}>
            Let others know what to expect from the course material, workload,
            and usefulness.
          </p>
          <Link to="/courses" className={styles.cardButtonOutline}>
            Review a Course
          </Link>
        </div>
      </section>

      <section className={styles.infoSection}>
        <h3 className={styles.infoTitle}>Why Your Review Matters</h3>
        <ul className={styles.infoList}>
          <li>Help students make informed decisions.</li>
          <li>Highlight great learning experiences (or issues).</li>
          <li>Contribute to a stronger academic community.</li>
        </ul>
      </section>
    </div>
  );
}
