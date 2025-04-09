// import { useInstructors } from '../hooks/useInstructors';
// import { Link } from 'react-router-dom';

// const Instructors = () => {
//   const { data: instructors, isLoading, error } = useInstructors();

//   return (
//     <div className="max-w-5xl mx-auto py-10 px-6 min-h-[69vh]">
//       <h1 className="text-3xl font-bold mb-6">Instructors 👩‍🏫</h1>

//       {isLoading && <p>Loading instructors...</p>}
//       {error && <p className="text-red-500">Failed to load instructors.</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {instructors?.map((instructor) => (
//           <Link
//             to={`/instructors/${instructor.id}`}
//             key={instructor.id}
//             className="border rounded p-4 hover:shadow transition block"
//           >
//             <h3 className="font-semibold text-lg">
//               {instructor.first_name} {instructor.last_name}
//             </h3>
//             <p className="text-sm text-gray-600">{instructor.department}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Instructors;

import { useState } from "react";
import { useInstructors } from "../hooks/useInstructors";
import { Link } from "react-router-dom";

const Instructors = () => {
  const { data: instructors, isLoading, error } = useInstructors();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const uniqueDepartments = [...new Set(instructors?.map((i) => i.department))];

  const filteredInstructors = instructors?.filter((instructor) => {
    const fullName =
      `${instructor.first_name} ${instructor.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter
      ? instructor.department === departmentFilter
      : true;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 min-h-[70vh]">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 tracking-tight text-[#f6c514]">
          Select and Review Instructors 👩‍🏫
        </h1>
        <p className="text-gray-600 text-sm">
          Browse instructors by department or search by name.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="Search instructor by name..."
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {uniqueDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {isLoading && (
        <div className="text-center text-blue-500 text-lg font-medium">
          Loading instructors...
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 font-semibold">
          Oops! Failed to load instructors. Please try again later.
        </div>
      )}

      {!isLoading && !error && filteredInstructors?.length === 0 && (
        <div className="text-center text-gray-500">
          No instructors match your search criteria.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstructors?.map((instructor) => (
          <Link
            to={`/instructors/${instructor.id}`}
            key={instructor.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 flex flex-col gap-2"
          >
            <div className="text-xl font-semibold text-gray-800">
              {instructor.first_name} {instructor.last_name}
            </div>
            <div className="text-sm text-gray-600 italic">
              {instructor.department}
            </div>
            <div className="text-sm text-gray-500">
              <strong>Email:</strong> {instructor.email ?? "Not available"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
