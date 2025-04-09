// import { useState } from "react";
// import { useMyTutorProfile } from "../hooks/useMyTutorProfile";
// import { useCreateTutorProfile } from "../hooks/useCreateTutorProfile";
// import { Link } from "react-router-dom";

// const TutorProfileSetup = () => {
//   const { data: profile, isLoading } = useMyTutorProfile();
//   const [subjects, setSubjects] = useState("");
//   const { mutate, isLoading: creating, isError } = useCreateTutorProfile();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const subjectList = subjects
//       .split(",")
//       .map((s) => s.trim())
//       .filter(Boolean);
//     mutate({ tutor_profile: { subjects: subjectList } });
//   };

//   if (isLoading)
//     return (
//       <p className="text-center py-10 text-muted">Loading profile status...</p>
//     );

//   if (profile) {
//     return (
//       <div className="max-w-lg mx-auto py-10 px-6">
//         <h1 className="text-2xl font-bold mb-4">You're a Tutor 🎓</h1>
//         <p className="text-gray-600 mb-2">Subjects:</p>
//         <ul className="list-disc list-inside mb-6">
//           {profile.subjects.map((subj, i) => (
//             <li key={i}>{subj}</li>
//           ))}
//         </ul>

//         <Link
//           to="/tutoring/request"
//           className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
//         >
//           Need Tutoring Instead?
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-lg mx-auto py-10 px-6">
//       <h1 className="text-2xl font-bold mb-4">Become a Tutor 🎓</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <label className="block">
//           <span className="text-gray-700">Subjects (comma separated)</span>
//           <input
//             className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-primary"
//             type="text"
//             value={subjects}
//             onChange={(e) => setSubjects(e.target.value)}
//             placeholder="Math, Physics, Chemistry"
//             required
//           />
//         </label>
//         <button
//           type="submit"
//           className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
//           disabled={creating}
//         >
//           {creating ? "Submitting..." : "Create Tutor Profile"}
//         </button>
//         {isError && (
//           <p className="text-red-500 text-sm">Something went wrong.</p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default TutorProfileSetup;

import { useState } from "react";
import { useMyTutorProfile } from "../hooks/useMyTutorProfile";
import { useCreateTutorProfile } from "../hooks/useCreateTutorProfile";
import { Link } from "react-router-dom";

const TutorProfileSetup = () => {
  const { data: profile, isLoading } = useMyTutorProfile();
  const [subjects, setSubjects] = useState("");
  const { mutate, isLoading: creating, isError } = useCreateTutorProfile();

  const handleSubmit = (e) => {
    e.preventDefault();
    const subjectList = subjects
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    mutate({ tutor_profile: { subjects: subjectList } });
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Checking your tutor profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 space-y-10">
      <h1 className="text-3xl font-bold text-center text-primary mb-5">
        Tutor Profile Portal 🎓
      </h1>

      {/* Tutoring Guidelines */}
      <section>
        <h2 className="text-xl font-semibold">Tutoring Best Practices</h2>
        <ul className="list-disc list-inside text-gray-700 text-sm mt-2 space-y-1">
          <li>Always arrive on time for sessions.</li>
          <li>Prepare relevant material in advance.</li>
          <li>
            Encourage students to think rather than giving direct answers.
          </li>
        </ul>
      </section>

      {/* Ethics & Morals */}
      <section>
        <h2 className="text-xl font-semibold">Professional Ethics</h2>
        <ul className="list-disc list-inside text-gray-700 text-sm mt-2 space-y-1">
          <li>
            Maintain academic honesty—never complete assignments for students.
          </li>
          <li>Respect confidentiality and personal boundaries.</li>
          <li>Report any concerning behavior to administrators.</li>
        </ul>
      </section>

      {profile ? (
        <div>
          <h2 className="text-xl font-semibold mt-6">Your Tutor Subjects</h2>
          <ul className="list-disc list-inside text-gray-800">
            {profile.subjects.map((subj, i) => (
              <li key={i}>{subj}</li>
            ))}
          </ul>

          <Link
            to="/tutoring/request"
            className="inline-block mt-6 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
          >
            Need Tutoring Instead?
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Subjects (comma separated)</span>
            <input
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-primary"
              type="text"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              placeholder="Math, Physics, Chemistry"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
            disabled={creating}
          >
            {creating ? "Submitting..." : "Create Tutor Profile"}
          </button>
          {isError && (
            <p className="text-red-500 text-sm">
              Something went wrong. Try again.
            </p>
          )}
        </form>
      )}

      {/* Terms and Conditions */}
      <section className="border-l-4 border-primary pl-4">
        <h2 className="text-xl font-semibold">Terms & Conditions</h2>
        <ul className="list-disc list-inside text-gray-700 text-sm mt-2 space-y-1">
          <li>You cannot delete your tutor profile on your own.</li>
          <li>You must attend all tutoring appointments once accepted.</li>
          <li>Repeated cancellations or no-shows may lead to suspension.</li>
        </ul>
      </section>
    </div>
  );
};

export default TutorProfileSetup;
