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
        <div className="text-center text-primary text-lg font-medium">
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

            {/* Rating Section */}
            <div className="mt-3 text-sm text-gray-700">
              {Number(instructor.avg_rating) > 0 ? (
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(Number(instructor.avg_rating))
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.644a1 1 0 00.95.69h3.805c.969 0 1.371 1.24.588 1.81l-3.08 2.235a1 1 0 00-.364 1.118l1.18 3.644c.3.921-.755 1.688-1.54 1.118l-3.08-2.235a1 1 0 00-1.176 0l-3.08 2.235c-.785.57-1.84-.197-1.54-1.118l1.18-3.644a1 1 0 00-.364-1.118L2.026 9.07c-.783-.57-.38-1.81.588-1.81h3.805a1 1 0 00.95-.69l1.18-3.644z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs text-gray-500">
                    ({Number(instructor.avg_rating).toFixed(1)}/5)
                  </span>
                </div>
              ) : (
                <span className="text-gray-400 italic">No rating yet</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
