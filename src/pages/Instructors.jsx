import { useInstructors } from '../hooks/useInstructors';
import { Link } from 'react-router-dom';

const Instructors = () => {
  const { data: instructors, isLoading, error } = useInstructors();

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 min-h-[69vh]">
      <h1 className="text-3xl font-bold mb-6">Instructors 👩‍🏫</h1>

      {isLoading && <p>Loading instructors...</p>}
      {error && <p className="text-red-500">Failed to load instructors.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {instructors?.map((instructor) => (
          <Link
            to={`/instructors/${instructor.id}`}
            key={instructor.id}
            className="border rounded p-4 hover:shadow transition block"
          >
            <h3 className="font-semibold text-lg">
              {instructor.first_name} {instructor.last_name}
            </h3>
            <p className="text-sm text-gray-600">{instructor.department}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
