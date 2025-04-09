// import { useCourses } from '../hooks/useCourses';
// import { Link } from 'react-router-dom';

// const Courses = () => {
//   const { data: courses, isLoading, error } = useCourses();

//   return (
//     <div className="max-w-5xl mx-auto py-10 px-6 min-h-[69vh]">
//       <h1 className="text-3xl font-bold mb-6">Courses 📚</h1>

//       {isLoading && <p>Loading courses...</p>}
//       {error && <p className="text-red-500">Failed to load courses.</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {courses?.map((course) => (
//           <Link
//             to={`/courses/${course.id}`}
//             key={course.id}
//             className="border rounded p-4 hover:shadow transition block"
//           >
//             <h3 className="font-semibold text-lg">{course.title}</h3>
//             <p className="text-sm text-gray-600">{course.subject}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Courses;
import { useState } from "react";
import { useCourses } from "../hooks/useCourses";
import { Link } from "react-router-dom";

const Courses = () => {
  const { data: courses, isLoading, error } = useCourses();
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const uniqueSubjects = [...new Set(courses?.map((course) => course.subject))];

  const filteredCourses = courses?.filter((course) => {
    const query = search.toLowerCase();
    const matchesSearch =
      course.title.toLowerCase().includes(query) ||
      course.subject.toLowerCase().includes(query) ||
      course.course_number.toString().includes(query);

    const matchesDept = departmentFilter
      ? course.subject === departmentFilter
      : true;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 min-h-[70vh]">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 tracking-tight text-[#f6c514]">
          Explore and Review Courses 📚
        </h1>
        <p className="text-gray-600 text-sm">
          Search by course name, number, or subject. Filter by department below.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
        <input
          type="text"
          placeholder="Search title, subject or course number..."
          className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Subjects</option>
          {uniqueSubjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </div>

      {/* States */}
      {isLoading && (
        <p className="text-center text-primary text-lg font-medium">
          Loading courses...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 font-semibold">
          Failed to load courses. Please try again later.
        </p>
      )}
      {!isLoading && !error && filteredCourses?.length === 0 && (
        <p className="text-center text-gray-500">
          No courses found matching your filters.
        </p>
      )}

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses?.map((course) => (
          <Link
            to={`/courses/${course.id}`}
            key={course.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {course.title}
              </h3>
              <p className="text-xs text-gray-400 mb-1 italic">
                Program Code: {course.subject}-{course.course_number}
              </p>
              <p className="text-sm text-gray-500">Credits: {course.credits}</p>
            </div>

            <div className="mt-3 text-sm text-gray-700">
              {Number(course.avg_rating) > 0 ? (
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(Number(course.avg_rating))
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
                    ({Number(course.avg_rating).toFixed(1)}/5)
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

export default Courses;
