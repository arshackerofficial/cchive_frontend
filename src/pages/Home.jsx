import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      fetch('http://localhost:3000/api/v1/users')
        .then((res) => res.json()),
  });

  const [query, setQuery] = useState('');
  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-background min-h-screen text-gray-800 p-6">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Get Connected.</h1>
        <p className="text-muted mb-6">Search if your friends are here:</p>
        <input
          type="text"
          placeholder="Search by username"
          className="w-full max-w-md px-4 py-2 border border-muted rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ul className="mt-4 space-y-2 max-w-md mx-auto">
          {filtered.map((user) => (
            <li key={user.username} className="bg-white p-3 rounded shadow text-left">
              {user.first_name} {user.last_name} <span className="text-muted text-sm">(@{user.username})</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <Feature
          title="Marketplace"
          desc="Buy and sell books, gear, and more."
          to="/marketplace"
        />
        <Feature
          title="Study Groups"
          desc="Chat, share files, stay organized."
          to="/study_groups"
        />
        <Feature
          title="Peer Tutoring"
          desc="Find and offer tutoring help."
          to="/tutoring/request"
        />
        <Feature
          title="Course Reviews"
          desc="Leave reviews for instructors and courses."
          to="/courses"
        />
      </section>
    </div>
  );
}

function Feature({ title, desc, to }) {
  return (
    <Link to={to} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <p className="text-sm text-muted mt-1">{desc}</p>
    </Link>
  );
}
