import {useListings} from '../hooks/useListings';
import CreateListingForm from '../components/CreateListingForm';
import { useState } from 'react';


const Marketplace = () => {
    const {data: listings, isLoading, error} = useListings();
    const [showForm, setShowForm] = useState(false)
    return (
        <div>
            <h1>Marketplace</h1>

            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                {showForm ? 'Cancel' : 'Create Listing'}
            </button>
            {showForm && <CreateListingForm onSuccess={() => setShowForm(false)} />}


            {isLoading && <p>Loading Listings...</p>}
            {error && <p>Failed to load Listings.</p>}

            <div className='flex flex-col gap-7 pl-7 pt-7 pr-7'>
                {console.log(listings)}
                {listings?.map((listing) => (
                    <div key={listing.id} className='border rounded p-4 shadow hover:shadow-md transition'>
                        <h3 className='text-xl font-semibold'>{listing.title}</h3>
                        <p>{listing.description}</p>
                        <p>{listing.price}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Marketplace;