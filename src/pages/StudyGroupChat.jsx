import { useEffect, useState, useRef } from 'react';
import { useCable } from '../context/CableContext';
import api from '../lib/api';
import { useParams } from 'react-router-dom';

const StudyGroupChat = () => {
  const { id: studyGroupId } = useParams();
  const cable = useCable();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
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
      { channel: 'StudyGroupChannel', study_group_id: studyGroupId },
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      setContent('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Study Group Chat</h1>

      <div className="h-80 overflow-y-auto mb-4 border rounded p-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <span className="font-semibold text-blue-700">{msg.full_name}</span>:{' '}
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

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
          Send
        </button>
      </form>
    </div>
  );
};

export default StudyGroupChat;
