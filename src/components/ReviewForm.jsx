import { useState } from "react";
import { useReviewSubmit } from '../hooks/useReviewSubmit';

const ReviewForm = ({reviewableType, reviewableId}) => {
    const [form, setForm] = useState( {content: '', rating: 1} );

    const {mutate, isLoading, isError} = useReviewSubmit({
        reviewableType, reviewableId,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(form);
        setForm({content: '', rating: 1});
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Leave a Review</h3>

            <textarea 
                required
                placeholder="Write your review..."
                className="w-full border rounded p-2"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}>
                </textarea>

            <input
                type="number"
                min="1"
                max="5"
                value={form.rating}
                className="border p-1 w-20"
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Review'}
                </button>

            {isError && <p className="text-red-500 text-sm">Could not submit review.</p>}
        </form>
    );
};

export default ReviewForm;