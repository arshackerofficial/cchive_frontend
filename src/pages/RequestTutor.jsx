import { useState } from 'react';
import { useTutors } from '../hooks/useTutors';
import { useBookAppointment } from '../hooks/useBookAppointment';

const RequestTutor = () => {
  const { data: tutors, isLoading } = useTutors();
  const { mutate, isLoading: sending, isError, isSuccess } = useBookAppointment();

  const [selectedTutorId, setSelectedTutorId] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [notes, setNotes] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const selectedTutor = tutors?.find((t) => t.id === parseInt(selectedTutorId));

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
        appointment: {
          tutor_profile_id: selectedTutorId,
          appointment_time: appointmentTime, 
          notes,
        },
      });      
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-4">Request a Tutor 🎓</h1>

      {isLoading ? (
        <p>Loading tutors...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Choose a Tutor</span>
            <select
              value={selectedTutorId}
              onChange={(e) => {
                setSelectedTutorId(e.target.value);
                setSelectedSubject('');
              }}
              className="w-full p-2 border rounded mt-1"
              required
            >
              <option value="">-- Select Tutor --</option>
              {tutors.map((tutor) => (
                <option key={tutor.id} value={tutor.id}>
                {tutor.tutor_name}
                </option>
              ))}
            </select>
          </label>

          {selectedTutor && (
            <label className="block">
              <span className="text-gray-700">Choose a Subject</span>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                required
              >
                <option value="">-- Select Subject --</option>
                {selectedTutor.subjects.map((subj, i) => (
                  <option key={i} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="block">
            <span className="text-gray-700">Pick a Time</span>
            <input
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Notes (optional)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={sending}
          >
            {sending ? 'Sending request...' : 'Request Appointment'}
          </button>

          {isSuccess && <p className="text-green-600">Request sent!</p>}
          {isError && <p className="text-red-600">Something went wrong.</p>}
        </form>
      )}
    </div>
  );
};

export default RequestTutor;
