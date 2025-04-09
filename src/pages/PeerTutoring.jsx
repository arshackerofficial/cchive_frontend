import { Link } from "react-router-dom";
import styles from "./PeerTutoring.module.css";
import tutoringHero from "../assets/peerTutoring.png";

export default function PeerTutoring() {
  return (
    <div className="bg-background min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeading}>Peer Tutoring at CC Hive</h1>
          <p className={styles.heroDescription}>
            One-on-one help from experienced students. Boost your grades,
            clarify doubts, and learn smarter.
          </p>
          <div className={styles.heroButtons}>
            <Link to="/tutoring/request" className={styles.btnPrimary}>
              Find a Tutor
            </Link>
            <Link to="/tutoring" className={styles.btnSecondary}>
              Become a Tutor
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src={tutoringHero} alt="Peer tutoring" />
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.sectionWrapper}>
        <h2 className={styles.sectionHeading}>Why Peer Tutoring?</h2>
        <ul className={styles.benefitsList}>
          <li>✔ Personalized academic support</li>
          <li>✔ Flexible scheduling</li>
          <li>✔ Safe, welcoming learning environment</li>
          <li>✔ Improve both academic and communication skills</li>
        </ul>
      </section>

      {/* Book a Tutor Section */}
      <section className={styles.sectionWrapperAlt}>
        <h2 className={styles.sectionHeading}>Book a Tutor</h2>
        <p className={styles.sectionDescription}>
          Ready to get started? Click below to explore available tutors by
          course or subject.
        </p>
        <Link to="/tutoring/request" className={styles.btnPrimary}>
          Book Now
        </Link>
      </section>

      {/* Tutor Support Section */}
      <section className={styles.sectionWrapper}>
        <h2 className={styles.sectionHeading}>How Tutors Help</h2>
        <ul className={styles.benefitsList}>
          <li>✔ Clarify complex topics</li>
          <li>✔ Offer study tips and exam prep strategies</li>
          <li>✔ Provide encouragement and peer insight</li>
          <li>✔ Share past academic experiences</li>
        </ul>
      </section>

      {/* Become a Tutor Section */}
      <section className={styles.sectionWrapperAlt}>
        <h2 className={styles.sectionHeading}>Become a Peer Tutor</h2>
        <p className={styles.sectionDescription}>
          Want to give back and strengthen your own understanding? Sign up to
          become a peer tutor!
        </p>
        <Link to="/tutoring" className={styles.btnSecondary}>
          Sign Up
        </Link>
      </section>
    </div>
  );
}
