import { useListings } from '../hooks/useListings';
import CreateListingForm from '../components/CreateListingForm';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const { data: listings, isLoading, error } = useListings();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary">Marketplace</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          {showForm ? 'Cancel' : 'Create Listing'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <CreateListingForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      {isLoading && <p className="text-gray-500">Loading Listings...</p>}
      {error && <p className="text-red-500">Failed to load Listings.</p>}

      <div className="grid gap-6 md:grid-cols-2">
        {listings?.map((listing) => (
          <div
            key={listing.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition p-6"
          >
            <h3 className="text-xl font-semibold text-primary mb-1">
              {listing.title}
            </h3>
            <p className="text-gray-700 mb-2">{listing.description}</p>
            <p>Sold by:             <Link to={`/user/${listing.seller_id}`} className="text-blue-600 hover:underline">{listing.seller}</Link>
            </p>
            <p className="text-lg font-semibold text-green-600">
              ${parseFloat(listing.price).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
