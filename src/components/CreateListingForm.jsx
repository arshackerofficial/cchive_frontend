import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import api from "../lib/api";

const CreateListingForm = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newListing) => {
            const res = await api.post('/listings', newListing);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['listings'] });
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(form);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Listing</h2>

            <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
                />
            <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full p-2 border rounded"
                rows={3}
                required
                />
            <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full p-2 border rounded"
                required
                />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={mutation.isLoading}>
                {mutation.isLoading ? 'Submitting...' : 'Post Listing'}
                </button>
            {mutation.isError && <p className="text-red-500">Failed to create listing.</p>}
        </form>
    );
};

export default CreateListingForm;