import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import banner from "../assets/banner.png";
import books from "../assets/books_300x200.png";
import peerTutoring from "../assets/peerTutoring_300x200.png";
import studyGroup from "../assets/studyGroup_300x200.png";
import reviews from "../assets/reviews_300x200.png";
import ReviewsCarousel from "../components/ReviewsCarousel/ReviewsCarousel";

export default function Home() {
  const studentReviews = [
    {
      text: `"CCHive made finding books SO much easier!"`,
      author: "Sukhman",
    },
    {
      text: `"I love how simple it is to trade textbooks here."`,
      author: "Arsh",
    },
    {
      text: `"Joining study groups saved my grades this semester!"`,
      author: "Amrit",
    },
    {
      text: `"Course reviews on CCHive helped me choose the best instructor!"`,
      author: "Harleen",
    },
    {
      text: `"I connected with an awesome tutor within minutes. So helpful!"`,
      author: "Jashanpreet",
    },
    {
      text: `"The messaging system made it easy to meet up and exchange books."`,
      author: "Santa",
    },
    {
      text: `"The interface is clean and fast. Loved how smooth everything feels."`,
      author: "Nil-Erdene",
    },
  ];

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:3000/api/v1/users").then((res) => res.json()),
  });

  const [query, setQuery] = useState("Search by Username");
  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(query.toLowerCase()) ||
      u.first_name.toLowerCase().includes(query.toLowerCase()) ||
      u.last_name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-background min-h-screen text-gray-800">
      {/* ////////////////// Hero Section Starts Here /////////////////// */}
      <section className={styles["hero"]}>
        <div className={styles["hero-content"]}>
          <h1 className={styles["hero-heading"]}>
            Empowering Students Through Collaboration
          </h1>

          <h2 className={styles["hero-subheading"]}>CC HIVE</h2>

          <p className={styles["hero-description"]}>
            Buy, sell, and trade textbooks. Connect with study groups and
            tutors. Rate courses &amp; instructors.
          </p>

          {/* <div className={styles["hero-buttons"]}>
            <button className={styles["btn-get-started"]}>Get Started</button>
            <button className={styles["btn-marketplace"]}>
              Browse Marketplace
            </button>
          </div> */}
        </div>

        <div className={styles["hero-image"]}>
          <img src={banner} alt="Welcome Image" />
        </div>
      </section>
      {/* ////////////////// Hero Section Ends Here /////////////////// */}

      {/* ////////////////// Get Connected Section Starts Here /////////////////// */}
      <section className="text-center py-12 bg-white">
        <h1 className="text-4xl font-bold text-primary mb-4">Get Connected.</h1>
        <p className="text-muted mb-6">Search if your friends are here:</p>
        <input
          type="text"
          placeholder="Search by username"
          className="w-full max-w-md px-4 py-2 border border-muted rounded"
          value={query == "Search by Username" ? "" : query}
          onChange={(e) =>
            setQuery(
              e.target.value == "" ? "Search by Username" : e.target.value
            )
          }
        />
        <ul className="mt-4 space-y-2 max-w-md mx-auto">
          {filtered.map((user) => (
            <li
              key={user.username}
              className="bg-white p-3 rounded shadow text-left"
            >
              {user.first_name} {user.last_name}{" "}
              <span className="text-muted text-sm">(@{user.username})</span>
            </li>
          ))}
        </ul>
      </section>
      {/* ////////////////// Get Connected Section Ends Here /////////////////// */}

      {/* ////////////////// How It Works Section Starts Here /////////////////// */}
      <section
        className={["bg-background", styles["how-it-works-section"]].join(" ")}
      >
        <div className={styles["how-it-works-header"]}>
          <h2 className={styles["hiw-main-heading"]}>How It Works</h2>
          <p className={styles["hiw-sub-heading"]}>Easy as 1, 2, 3!</p>
        </div>

        <div className={styles["how-it-works-steps"]}>
          <div className={styles["hiw-step"]} key={0}>
            <div className={styles["hiw-step-number"]}>{1}</div>
            <div className={styles["hiw-step-content"]}>
              <h3 className={styles["hiw-step-title"]}>Sign Up</h3>
              <span className={styles["hiw-step-description"]}>
                &mdash; Create your profile
              </span>
            </div>
          </div>
          <div className={styles["hiw-step"]} key={1}>
            <div className={styles["hiw-step-number"]}>{2}</div>
            <div className={styles["hiw-step-content"]}>
              <h3 className={styles["hiw-step-title"]}>Find & Connect</h3>
              <span className={styles["hiw-step-description"]}>
                &mdash; Buy books, join groups, get tutors
              </span>
            </div>
          </div>
          <div className={styles["hiw-step"]} key={2}>
            <div className={styles["hiw-step-number"]}>{3}</div>
            <div className={styles["hiw-step-content"]}>
              <h3 className={styles["hiw-step-title"]}>Achieve More</h3>
              <span className={styles["hiw-step-description"]}>
                &mdash; Save money, boost your grades, meet students
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* ////////////////// How It Works Section Ends Here /////////////////// */}

      {/* ////////////////// Features Section Starts Here /////////////////// */}
      <section className={styles["features-section"]}>
        <div className={styles["features-header"]}>
          <h2 className={styles["features-title"]}>Key Features</h2>
          <p className={styles["features-subtext"]}>
            We have 4 Main Features that will always help you keep connected and
            updated with CC Community. Feel Free to click and try them!
          </p>
        </div>
        <div className={styles["features-grid"]}>
          <Link to="/marketplace">
            <div className={styles["feature-card"]}>
              <div className={styles["feature-image-wrap"]}>
                <img
                  src={books}
                  alt="Marketplace"
                  className={styles["feature-image"]}
                />
              </div>
              <h3 className={styles["feature-title"]}>Marketplace</h3>
              <p className={styles["feature-description"]}>
                Buy and sell books, gear, and more.
              </p>
            </div>
          </Link>

          <Link to="/study_groups">
            <div className={styles["feature-card"]}>
              <div className={styles["feature-image-wrap"]}>
                <img
                  src={studyGroup}
                  alt="Study Groups"
                  className={styles["feature-image"]}
                />
              </div>
              <h3 className={styles["feature-title"]}>Study Groups</h3>
              <p className={styles["feature-description"]}>
                Chat, share files, stay organized.
              </p>
            </div>
          </Link>

          {/* <Link to="/tutoring/request"> */}
          <Link to="/peer-tutoring">
            <div className={styles["feature-card"]}>
              <div className={styles["feature-image-wrap"]}>
                <img
                  src={peerTutoring}
                  alt="Peer Tutoring"
                  className={styles["feature-image"]}
                />
              </div>
              <h3 className={styles["feature-title"]}>Peer Tutoring</h3>
              <p className={styles["feature-description"]}>
                Find and offer tutoring help.
              </p>
            </div>
          </Link>

          <Link to="/reviews">
            <div className={styles["feature-card"]}>
              <div className={styles["feature-image-wrap"]}>
                <img
                  src={reviews}
                  alt="Course Reviews"
                  className={styles["feature-image"]}
                />
              </div>
              <h3 className={styles["feature-title"]}>Course Reviews</h3>
              <p className={styles["feature-description"]}>
                Leave reviews for instructors and courses.
              </p>
            </div>
          </Link>
        </div>
      </section>
      {/* ////////////////// Features Section Ends Here /////////////////// */}
      <ReviewsCarousel
        title="What Students Say"
        subText="See why students love using CCHive!"
        reviews={studentReviews}
        autoSlideInterval={4000} // Slide every 4 seconds instead of 3
      />

      {/* ////////////////// Study Group Section Starts Here /////////////////// */}
      <section className={styles["study-groups-bar"]}>
        <div className={styles["study-groups-left"]}>
          <h2 className={styles["study-groups-title"]}>Find Study Groups</h2>
          <p className={styles["study-groups-subtitle"]}>
            {/* Replace this with your own subtext or remove if not needed */}
            Connect with peers in your courses or by subject.
          </p>
        </div>

        <div className={styles["study-groups-right"]}>
          <form className={styles["study-groups-search"]}>
            <input
              type="text"
              placeholder="Search by course code or subject"
              className={styles["search-input"]}
            />
          </form>
        </div>
      </section>
      {/* ////////////////// Study Group Section Ends Here /////////////////// */}
    </div>
  );
}

function Feature({ title, desc, to }) {
  return (
    <Link
      to={to}
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <p className="text-sm text-muted mt-1">{desc}</p>
    </Link>
  );
}
