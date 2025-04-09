import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import api from "../lib/api";

const CreateListingForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newListing) => {
      const res = await api.post("/listings", newListing);
      return res.data;
    },
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
    setForm({
      title: "",
      description: "",
      price: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 border-2 border-accent rounded px-5 py-9"
    >
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
        className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Submitting..." : "Post Listing"}
      </button>
      {mutation.isError && (
        <p className="text-red-500">Failed to create listing.</p>
      )}
    </form>
  );
};

export default CreateListingForm;
