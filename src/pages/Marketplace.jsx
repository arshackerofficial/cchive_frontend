import { useListings } from "../hooks/useListings";
import CreateListingForm from "../components/CreateListingForm";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { X } from "lucide-react";

const Marketplace = () => {
  const { data: listings, isLoading, error } = useListings();
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  const filteredListings = listings
    ?.filter((listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.seller.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCourse = filterCourse
        ? listing.title.toLowerCase().includes(filterCourse.toLowerCase())
        : true;
      return matchesSearch && matchesCourse;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return parseFloat(a.price) - parseFloat(b.price);
      if (sortOrder === "desc")
        return parseFloat(b.price) - parseFloat(a.price);
      return 0;
    });

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 relative z-0">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Welcome to the Student Marketplace
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          A platform built by students, for students — where you can easily buy,
          sell, and discover course-related resources.
        </p>
      </div>

      {/* Info Section */}
      <div className="mb-12 bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-primary mb-3">
          Why use the Marketplace?
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            💼 Sell old textbooks, notes, or course supplies to other students.
          </li>
          <li>
            📚 Buy resources you need at affordable prices from trusted peers.
          </li>
          <li>🧠 Support student learning and build community connections.</li>
        </ul>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Marketplace</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
        >
          Create Listing
        </button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-end">
        <input
          type="text"
          placeholder="Search by title, description, or seller..."
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by course (e.g. CSCI 275)"
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-primary"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-primary"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">Sort by price</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>

      {isLoading && <p className="text-gray-500">Loading Listings...</p>}
      {error && <p className="text-red-500">Failed to load Listings.</p>}

      <div className="grid gap-6 md:grid-cols-2">
        {filteredListings?.map((listing) => (
          <div
            key={listing.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition p-6"
          >
            <h3 className="text-xl font-semibold text-primary mb-1">
              {listing.title}
            </h3>
            <p className="text-gray-700 mb-2">{listing.description}</p>
            <p>
              Sold by:{" "}
              <Link
                to={`/user/${listing.seller_id}`}
                className="text-secondary hover:underline"
              >
                {listing.seller}
              </Link>
            </p>
            <p className="text-lg font-semibold text-green-600">
              ${parseFloat(listing.price).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
            <button
              className="absolute top-6 right-9 text-gray-400 text-4xl hover:text-red-500 text-2xl leading-none focus:outline-none"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <CreateListingForm onSuccess={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
