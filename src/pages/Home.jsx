// src/pages/Home.jsx

import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-extrabold mb-4 text-blue-700">
        Welcome to CCHive 🐝
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Your one-stop platform for connecting with fellow students—buy and sell stuff, join study groups, get tutoring help, and leave reviews on courses and instructors.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <Feature icon="🛒" title="Marketplace" desc="Buy and sell notes, books, and other student essentials." />
        <Feature icon="📚" title="Study Groups" desc="Join or create groups for collaborative learning." />
        <Feature icon="🎓" title="Peer Tutoring" desc="Find student tutors by subject and book appointments." />
        <Feature icon="⭐" title="Reviews" desc="Review instructors and courses to help others pick wisely." />
      </div>

      <Link
        to="/register"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Join CCHive Now
      </Link>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="border p-6 rounded shadow-sm text-left hover:shadow-md transition">
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default Home;
