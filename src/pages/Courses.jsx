import { useCourses } from '../hooks/useCourses';
import { Link } from 'react-router-dom';

const Courses = () => {
  const { data: courses, isLoading, error } = useCourses();

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 min-h-[69vh]">
      <h1 className="text-3xl font-bold mb-6">Courses 📚</h1>

      {isLoading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">Failed to load courses.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses?.map((course) => (
          <Link
            to={`/courses/${course.id}`}
            key={course.id}
            className="border rounded p-4 hover:shadow transition block"
          >
            <h3 className="font-semibold text-lg">{course.title}</h3>
            <p className="text-sm text-gray-600">{course.subject}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
