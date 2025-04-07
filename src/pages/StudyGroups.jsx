import { useState } from 'react';
import { useStudyGroups } from '../hooks/useStudyGroups';
import { useCreateStudyGroup } from '../hooks/useCreateStudyGroup';
import { useJoinStudyGroup } from '../hooks/useJoinStudyGroup';
import { useNavigate } from 'react-router-dom';

const StudyGroups = () => {
  const { data: groups, isLoading } = useStudyGroups();
  const { mutate: createGroup } = useCreateStudyGroup();
  const { mutate: joinGroup } = useJoinStudyGroup();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    createGroup({ study_group: { name, description } });
    setName('');
    setDescription('');
  };

  const handleJoin = (id) => {
    joinGroup(id, {
      onSuccess: () => {
        navigate(`/study_groups/${id}`);
      },
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8">Study Groups</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Groups</h2>
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <ul className="space-y-4">
              {groups.map((group) => (
                <li key={group.id} className="p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
                  <h3 className="text-lg font-bold text-primary mb-1">{group.name}</h3>
                  <p className="text-gray-600">{group.description}</p>
                  <button
                    onClick={() => handleJoin(group.id)}
                    className="mt-3 px-4 py-1.5 bg-primary text-white rounded hover:bg-blue-800 transition"
                  >
                    Join
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
          <div className='p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition'>
            <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Group Name</label>
              <input
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Quantum Mechanics Enthusiasts"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Description</label>
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
