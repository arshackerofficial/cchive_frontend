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
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Study Groups</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4 mb-8">
          {groups.map((group) => (
            <li key={group.id} className="p-4 border rounded">
              <h2 className="font-semibold text-lg">{group.name}</h2>
              <p className="text-gray-600">{group.description}</p>
              <button
                onClick={() => handleJoin(group.id)}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Join
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleCreate} className="space-y-4 border p-4 rounded">
        <h2 className="font-semibold text-lg">Create New Group</h2>
        <input
          className="w-full p-2 border rounded"
          placeholder="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Create Group
        </button>
      </form>
    </div>
  );
};

export default StudyGroups;
