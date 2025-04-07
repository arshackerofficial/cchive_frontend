import { useEffect, useState } from 'react';
import { useCable } from '../context/CableContext';

const StudyGroupChat = ({ studyGroupId }) => {
  const cable = useCable();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!cable) return;

    const subscription = cable.subscriptions.create(
      { channel: 'StudyGroupChannel', study_group_id: studyGroupId },
      {
        received: (data) => {
          console.log('New message:', data);
          setMessages((prev) => [...prev, data]);
        },
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [cable, studyGroupId]);

  return (
    <div className="p-4 border rounded mt-6">
      <h2 className="text-xl font-bold mb-4">Live Chat</h2>
      <div className="space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className="p-2 bg-gray-100 rounded">
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyGroupChat;
