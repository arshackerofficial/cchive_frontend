import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

const UserProfile = () => {
  const { username } = useParams();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: async () => {
      const res = await api.get(`/users/${username}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Could not load user.</p>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      {console.log(user)}
      <h1 className="text-3xl font-bold mb-2">
        {user.first_name} {user.last_name}
      </h1>
      <p className="text-gray-500">@{user.username}</p>
      <p className="mt-4">{user.bio}</p>
      <p>
        📧 Email &nbsp;
        <a
          href={`mailto:${user.email}`}
          className="inline-block mt-2 text-blue-500 hover:text-blue-700 underline"
        >
          @{user.username}
        </a>
      </p>

      {user.tutor_profile && (
        <div className="mt-6 p-4 border rounded bg-green-50">
          <h2 className="text-xl font-semibold">Tutor Subjects</h2>
          <ul className="list-disc list-inside">
            {user.tutor_profile.subjects.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {user.listings?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Marketplace Listings</h2>
          <ul className="space-y-2">
            {user.listings.map((l) => (
              <li key={l.id} className="border rounded p-3 shadow-sm">
                <h3 className="font-bold">{l.title}</h3>
                <p>{l.description}</p>
                <p className="text-sm text-gray-500">${l.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
