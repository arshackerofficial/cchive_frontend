// import { useState } from "react";
// import { useTutors } from "../hooks/useTutors";
// import { useBookAppointment } from "../hooks/useBookAppointment";

// const RequestTutor = () => {
//   const { data: tutors, isLoading } = useTutors();
//   const {
//     mutate,
//     isLoading: sending,
//     isError,
//     isSuccess,
//   } = useBookAppointment();

//   const [selectedTutorId, setSelectedTutorId] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [notes, setNotes] = useState("");
//   const [appointmentTime, setAppointmentTime] = useState("");

//   const selectedTutor = tutors?.find((t) => t.id === parseInt(selectedTutorId));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutate({
//       appointment: {
//         tutor_profile_id: selectedTutorId,
//         appointment_time: appointmentTime,
//         notes,
//       },
//     });
//   };

//   return (
//     <div className="max-w-xl mx-auto py-10 px-6">
//       <h1 className="text-2xl font-bold mb-4">Request a Tutor 🎓</h1>

//       {isLoading ? (
//         <p>Loading tutors...</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <label className="block">
//             <span className="text-gray-700">Choose a Tutor</span>
//             <select
//               value={selectedTutorId}
//               onChange={(e) => {
//                 setSelectedTutorId(e.target.value);
//                 setSelectedSubject("");
//               }}
//               className="w-full p-2 border rounded mt-1"
//               required
//             >
//               <option value="">-- Select Tutor --</option>
//               {tutors.map((tutor) => (
//                 <option key={tutor.id} value={tutor.id}>
//                   {tutor.tutor_name}
//                 </option>
//               ))}
//             </select>
//           </label>

//           {selectedTutor && (
//             <label className="block">
//               <span className="text-gray-700">Choose a Subject</span>
//               <select
//                 value={selectedSubject}
//                 onChange={(e) => setSelectedSubject(e.target.value)}
//                 className="w-full p-2 border rounded mt-1"
//                 required
//               >
//                 <option value="">-- Select Subject --</option>
//                 {selectedTutor.subjects.map((subj, i) => (
//                   <option key={i} value={subj}>
//                     {subj}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           )}

//           <label className="block">
//             <span className="text-gray-700">Pick a Time</span>
//             <input
//               type="datetime-local"
//               value={appointmentTime}
//               onChange={(e) => setAppointmentTime(e.target.value)}
//               className="w-full p-2 border rounded mt-1"
//               required
//             />
//           </label>

//           <label className="block">
//             <span className="text-gray-700">Notes (optional)</span>
//             <textarea
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               className="w-full p-2 border rounded mt-1"
//             />
//           </label>

//           <button
//             type="submit"
//             className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
//             disabled={sending}
//           >
//             {sending ? "Sending request..." : "Request Appointment"}
//           </button>

//           {isSuccess && <p className="text-green-600">Request sent!</p>}
//           {isError && <p className="text-red-600">Something went wrong.</p>}
//         </form>
//       )}
//     </div>
//   );
// };

// export default RequestTutor;

import { useState } from "react";
import { useTutors } from "../hooks/useTutors";
import { useBookAppointment } from "../hooks/useBookAppointment";

const RequestTutor = () => {
  const { data: tutors, isLoading } = useTutors();
  const {
    mutate,
    isLoading: sending,
    isError,
    isSuccess,
  } = useBookAppointment();

  const [selectedTutorId, setSelectedTutorId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [notes, setNotes] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

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
    <div className="max-w-2xl mx-auto py-10 px-6 space-y-8">
      {/* Main Page Heading */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-primary mb-2">
          Peer Tutoring Request Portal
        </h1>
        <p className="text-gray-600 text-sm">
          Connect with fellow students and get the help you need to succeed 📚
        </p>
      </header>
      {/* Booking Guidelines */}
      <section className="bg-white p-4 rounded-lg shadow border">
        <h2 className="text-lg font-bold text-primary mb-2">
          Before Booking a Tutor
        </h2>
        <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
          <li>Check tutor availability and subject expertise.</li>
          <li>Have a clear topic or question in mind before booking.</li>
          <li>Double-check your selected time and date.</li>
          <li>Add any relevant notes to help the tutor prepare.</li>
        </ul>
      </section>

      {/* Tips for Success */}
      <section className="bg-white p-4 rounded-lg shadow border">
        <h2 className="text-lg font-bold text-primary mb-2">
          Maximize Your Tutoring Session
        </h2>
        <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
          <li>Arrive on time and be ready to engage.</li>
          <li>Bring specific problems or questions to work through.</li>
          <li>Take notes during the session.</li>
          <li>Ask for clarification if something isn’t clear.</li>
        </ul>
      </section>

      {/* Main Booking Form */}
      <section>
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
                  setSelectedSubject("");
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
              className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
              disabled={sending}
            >
              {sending ? "Sending request..." : "Request Appointment"}
            </button>

            {isSuccess && <p className="text-green-600">Request sent!</p>}
            {isError && <p className="text-red-600">Something went wrong.</p>}
          </form>
        )}
      </section>

      {/* Terms and Conditions */}
      <section className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Terms and Conditions</h2>
        <p className="text-sm text-gray-700">
          By booking a tutoring session, you agree to respect your tutor's time
          and communicate any cancellations at least 24 hours in advance.
          Repeated no-shows may result in restricted access to tutoring
          services.
        </p>
      </section>
    </div>
  );
};

export default RequestTutor;
