// import { useState } from "react";
// import { useStudyGroups } from "../hooks/useStudyGroups";
// import { useCreateStudyGroup } from "../hooks/useCreateStudyGroup";
// import { useJoinStudyGroup } from "../hooks/useJoinStudyGroup";
// import { useNavigate } from "react-router-dom";

// const StudyGroups = () => {
//   const { data: groups, isLoading } = useStudyGroups();
//   const { mutate: createGroup } = useCreateStudyGroup();
//   const { mutate: joinGroup } = useJoinStudyGroup();
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const navigate = useNavigate();

//   const handleCreate = (e) => {
//     e.preventDefault();
//     createGroup({ study_group: { name, description } });
//     setName("");
//     setDescription("");
//   };

//   const handleJoin = (id) => {
//     joinGroup(id, {
//       onSuccess: () => {
//         navigate(`/study_groups/${id}`);
//       },
//     });
//   };

//   return (
//     <div className="max-w-6xl mx-auto py-10 px-4">
//       <h1 className="text-3xl font-bold text-primary mb-8">Study Groups</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Available Groups</h2>
//           {isLoading ? (
//             <p className="text-gray-500">Loading...</p>
//           ) : (
//             <ul className="space-y-4">
//               {groups.map((group) => (
//                 <li
//                   key={group.id}
//                   className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
//                 >
//                   <h3 className="text-lg font-bold text-primary mb-1">
//                     {group.name}
//                   </h3>
//                   <p className="text-gray-600">{group.description}</p>
//                   <button
//                     onClick={() => handleJoin(group.id)}
//                     className="mt-3 px-4 py-1.5 bg-primary text-white rounded hover:bg-secondary transition"
//                   >
//                     Join
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
//           <div className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
//             <form onSubmit={handleCreate} className="space-y-4">
//               <div>
//                 <label className="block text-sm text-gray-700 mb-1">
//                   Group Name
//                 </label>
//                 <input
//                   className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
//                   placeholder="Quantum Mechanics Enthusiasts"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
//                   placeholder="We solve problem sets and drink too much coffee"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                   rows={4}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//               >
//                 Create Group
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudyGroups;

import { useState } from "react";
import { useStudyGroups } from "../hooks/useStudyGroups";
import { useCreateStudyGroup } from "../hooks/useCreateStudyGroup";
import { useJoinStudyGroup } from "../hooks/useJoinStudyGroup";
import { useNavigate } from "react-router-dom";

const StudyGroups = () => {
  const { data: groups, isLoading } = useStudyGroups();
  const { mutate: createGroup } = useCreateStudyGroup();
  const { mutate: joinGroup } = useJoinStudyGroup();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    createGroup({ study_group: { name, description } });
    setName("");
    setDescription("");
  };

  const handleJoin = (id) => {
    joinGroup(id, {
      onSuccess: () => {
        navigate(`/study_groups/${id}`);
      },
    });
  };

  const filteredGroups = groups?.filter((group) =>
    group.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Find Your Study Squad
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join or create study groups instantly! Whether you're looking for help
          or offering it, it's just a click away. All groups are open — no
          hassle to join!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Available Groups</h2>
            <input
              type="text"
              placeholder="Search groups..."
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <ul className="space-y-4">
              {filteredGroups.map((group) => (
                <li
                  key={group.id}
                  className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
                >
                  <h3 className="text-lg font-bold text-primary mb-1">
                    {group.name}
                  </h3>
                  <p className="text-gray-600">{group.description}</p>
                  <button
                    onClick={() => handleJoin(group.id)}
                    className="mt-3 px-4 py-1.5 bg-primary text-white rounded hover:bg-secondary transition"
                  >
                    Open
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          {/* UX Enhancement Section */}
          <div className="mb-8 bg-blue-50 p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Getting Help is Easy
            </h3>
            <p className="text-sm text-blue-800">
              Just search for a group that matches your need and hit "Open".
              Can't find what you're looking for? Create your own group. It's
              that simple!
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-4">Create a New Group</h2>
          <div className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Group Name
                </label>
                <input
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Quantum Mechanics Enthusiasts"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="We solve problem sets and drink too much coffee"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Create Group
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroups;
