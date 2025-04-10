// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import api from "../lib/api";

// const UserProfile = () => {
//   const { username } = useParams();

//   const {
//     data: user,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["user", username],
//     queryFn: async () => {
//       const res = await api.get(`/users/${username}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <p>Loading user...</p>;
//   if (error) return <p>Could not load user.</p>;

//   return (
//     <div className="max-w-3xl mx-auto py-10 px-6">
//       {console.log(user)}
//       <h1 className="text-3xl font-bold mb-2">
//         {user.first_name} {user.last_name}
//       </h1>
//       <p className="text-gray-500">@{user.username}</p>
//       <p className="mt-4">{user.bio}</p>
//       <p>
//         📧 Email &nbsp;
//         <a
//           href={`mailto:${user.email}`}
//           className="inline-block mt-2 text-blue-500 hover:text-blue-700 underline"
//         >
//           @{user.username}
//         </a>
//       </p>

//       {user.tutor_profile && (
//         <div className="mt-6 p-4 border rounded bg-green-50">
//           <h2 className="text-xl font-semibold">Tutor Subjects</h2>
//           <ul className="list-disc list-inside">
//             {user.tutor_profile.subjects.map((s, i) => (
//               <li key={i}>{s}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {user.listings?.length > 0 && (
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">Marketplace Listings</h2>
//           <ul className="space-y-2">
//             {user.listings.map((l) => (
//               <li key={l.id} className="border rounded p-3 shadow-sm">
//                 <h3 className="font-bold">{l.title}</h3>
//                 <p>{l.description}</p>
//                 <p className="text-sm text-gray-500">${l.price}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;

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
      // Example: Adjust the endpoint as needed
      const res = await api.get(`/users/${username}`);
      return res.data;
    },
  });

  if (isLoading) {
    // Show a loading skeleton or a spinner for better UX
    return (
      <div className="max-w-3xl mx-auto py-10 px-6">
        <p className="animate-pulse text-gray-500">Loading user profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-6">
        <p className="text-red-500 font-semibold">
          Could not load user profile. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      {/* --- Profile Header --- */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        {/* Placeholder or actual avatar if you have it */}
        <img
          src={"https://robohash.org/" + user.username + "?gravatar=yes"}
          alt="User avatar"
          className="w-20 h-20 rounded-full border border-gray-300 object-cover"
        />
        <div className="mt-4 md:mt-0 md:ml-6">
          <h1 className="text-2xl font-bold">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-500">@{user.username}</p>
          {user.email && (
            <p className="mt-3 text-sm">
              <span className="font-medium">Email:</span>{" "}
              <a
                href={`mailto:${user.email}`}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {user.email}
              </a>
            </p>
          )}
        </div>
      </div>

      {/* --- Bio Section --- */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <div className="bg-white border rounded p-4 shadow-sm">
          {user.bio ? (
            <p className="text-gray-700">{user.bio}</p>
          ) : (
            <p className="text-gray-500 italic">No bio provided.</p>
          )}
        </div>
      </section>

      {/* --- Tutor Profile, if present --- */}
      {user.tutor_profile && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Tutor Information</h2>
          <div className="bg-green-50 border rounded p-4 shadow-sm">
            {user.tutor_profile.subjects &&
            user.tutor_profile.subjects.length > 0 ? (
              <>
                <p className="font-medium">Subjects tutored:</p>
                <ul className="list-disc list-inside mt-2">
                  {user.tutor_profile.subjects.map((subject, idx) => (
                    <li key={idx}>{subject}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-gray-500 italic">No subjects listed.</p>
            )}
            {/* If your tutor_profile has more fields, display them similarly. */}
          </div>
        </section>
      )}

      {/* --- Listings --- */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Marketplace Listings</h2>
        {user.listings && user.listings.length > 0 ? (
          <ul className="space-y-2">
            {user.listings.map((item) => (
              <li key={item.id} className="border rounded p-4 shadow-sm">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
                {item.price !== undefined && (
                  <p className="text-sm text-gray-500 mt-1">
                    Price: <span className="font-medium">${item.price}</span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No active listings.</p>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
