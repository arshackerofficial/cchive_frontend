// import { useEffect, useState, useRef } from "react";
// import { useCable } from "../context/CableContext";
// import api from "../lib/api";
// import { useParams } from "react-router-dom";

// const StudyGroupChat = () => {
//   const { id: studyGroupId } = useParams();
//   const cable = useCable();
//   const [messages, setMessages] = useState([]);
//   const [content, setContent] = useState("");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const res = await api.get(`/study_groups/${studyGroupId}/messages`);
//       setMessages(res.data);
//     };

//     fetchMessages();
//   }, [studyGroupId]);

//   useEffect(() => {
//     if (!cable) return;

//     const subscription = cable.subscriptions.create(
//       { channel: "StudyGroupChannel", study_group_id: studyGroupId },
//       {
//         received: (data) => {
//           setMessages((prev) => [...prev, data]);
//         },
//       }
//     );

//     return () => {
//       subscription.unsubscribe();
//     };
//   }, [cable, studyGroupId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!content.trim()) return;

//     try {
//       await api.post(`/study_groups/${studyGroupId}/messages`, {
//         message: {
//           content,
//           study_group_id: studyGroupId,
//         },
//       });
//       setContent("");
//     } catch (err) {
//       console.error("Failed to send message:", err);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 border rounded shadow">
//       <h1 className="text-xl font-bold mb-4">Study Group Chat</h1>

//       <div className="h-80 overflow-y-auto mb-4 border rounded p-2 bg-gray-50">
//         {messages.map((msg, i) => (
//           <div key={i} className="mb-2">
//             <span className="font-semibold text-primary">{msg.full_name}</span>:{" "}
//             <span className="text-gray-800">{msg.message || msg.content}</span>
//             {msg.created_at && (
//               <span className="text-xs text-gray-500 ml-2">
//                 ({new Date(msg.created_at).toLocaleTimeString()})
//               </span>
//             )}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSubmit} className="flex gap-2">
//         <input
//           type="text"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 p-2 border rounded"
//         />
//         <button className="bg-primary text-white px-4 rounded hover:bg-secondary">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StudyGroupChat;

import { useEffect, useState, useRef } from "react";
import { useCable } from "../context/CableContext";
import api from "../lib/api";
import { useParams } from "react-router-dom";
import { useStudyGroups } from "../hooks/useStudyGroups";

const StudyGroupChat = () => {
  const { id: studyGroupId } = useParams();
  const cable = useCable();
  const [messages, setMessages] = useState([]);
  const { data: groups, isLoading } = useStudyGroups();
  const groupName = groups?.filter((group) => group.id == studyGroupId)[0].name;
  const [content, setContent] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await api.get(`/study_groups/${studyGroupId}/messages`);
      setMessages(res.data);
    };
    fetchMessages();
  }, [studyGroupId]);

  useEffect(() => {
    if (!cable) return;

    const subscription = cable.subscriptions.create(
      { channel: "StudyGroupChannel", study_group_id: studyGroupId },
      {
        received: (data) => {
          setMessages((prev) => [...prev, data]);
        },
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [cable, studyGroupId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await api.post(`/study_groups/${studyGroupId}/messages`, {
        message: {
          content,
          study_group_id: studyGroupId,
        },
      });
      setContent("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Welcome to {groupName} Group
        </h1>
        <p className="text-gray-600">
          Connect, collaborate, and conquer your studies together!
        </p>
      </div>

      {/* Group Info */}
      <div className="bg-white border rounded-lg p-4 shadow mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-2">
          {groupName} Chat
        </h2>
        <p className="text-gray-700 text-sm">
          Messages are updated in real-time. Be respectful and helpful to
          maintain a productive environment.
        </p>
      </div>

      {/* Chat Box */}
      <div className="h-96 overflow-y-auto mb-4 border rounded p-3 bg-gray-50 shadow-inner">
        {messages.map((msg, i) => (
          <div key={i} className="mb-3">
            <span className="font-semibold text-primary">{msg.full_name}</span>:{" "}
            <span className="text-gray-800">{msg.message || msg.content}</span>
            {msg.created_at && (
              <span className="text-xs text-gray-500 ml-2">
                ({new Date(msg.created_at).toLocaleTimeString()})
              </span>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="bg-primary text-white px-4 rounded hover:bg-secondary transition">
          Send
        </button>
      </form>

      {/* Group Chat Guidelines */}
      <div className="mt-8 bg-blue-50 p-4 rounded shadow-sm">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">
          Remember While Texting
        </h3>
        <ul className="list-disc pl-5 text-blue-900 text-sm space-y-1">
          <li>Be respectful and professional.</li>
          <li>No spamming or off-topic messages.</li>
          <li>Use clear and concise language.</li>
          <li>Report inappropriate behavior to admin.</li>
        </ul>
      </div>

      {/* Terms & Conditions */}
      <div className="mt-6 text-sm text-gray-600 border-t pt-4">
        <h4 className="font-semibold mb-1">Terms & Conditions</h4>
        <p>
          By participating in this chat, you agree to follow community
          standards. Violations may result in temporary or permanent ban from
          the platform. Always be courteous and constructive.
        </p>
      </div>
    </div>
  );
};

export default StudyGroupChat;
