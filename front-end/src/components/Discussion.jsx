import React, { useState, useEffect, useRef } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from './firebase';

const topics = ['Stocks', 'Crypto', 'Gold', 'Mutual Funds', 'Real Estate'];

const DiscussionForum = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const speechRecognitionRef = useRef(null); // Ref for speech recognition

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setError('');
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messageList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageList);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: message,
        userId: user.uid,
        userEmail: user.email,
        topic: selectedTopic,
        createdAt: serverTimestamp(),
      });
      setMessage('');
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredMessages = messages.filter((msg) => msg.topic === selectedTopic);

  // Function to handle speech recognition
  const handleStartListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    speechRecognitionRef.current = recognition; // Store reference

    recognition.onstart = () => {
      console.log('Voice recognition started. Try speaking into the microphone.');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript); // Set the recognized text as message
      console.log('Recognized text:', transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setError(event.error);
    };

    recognition.onend = () => {
      console.log('Voice recognition ended.');
    };

    recognition.start(); // Start recognition
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 w-full max-w-4xl mx-auto">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
                  Discussion Forum
                </h1>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {error}
                  </div>
                )}

                {!user ? (
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-4 mb-4">
                      <button
                        onClick={() => setIsLogin(true)}
                        className={`px-4 py-2 rounded ${
                          isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                      >
                        Login
                      </button>
                      <button
                        onClick={() => setIsLogin(false)}
                        className={`px-4 py-2 rounded ${
                          !isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}
                      >
                        Register
                      </button>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        {isLogin ? 'Login' : 'Register'}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">Logged in as {user.email}</span>
                      <button
                        onClick={handleSignOut}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Sign Out
                      </button>
                    </div>

                    <div className="flex justify-center mb-4">
                      {topics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => setSelectedTopic(topic)}
                          className={`px-4 py-2 mx-1 rounded ${
                            selectedTopic === topic ? 'bg-blue-500 text-white' : 'bg-gray-200'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>

                    <div className="h-96 overflow-y-auto mb-4 border rounded p-4">
                      {filteredMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`mb-4 p-3 rounded ${
                            msg.userId === user.uid
                              ? 'bg-blue-100 ml-auto max-w-[80%]'
                              : 'bg-gray-100 mr-auto max-w-[80%]'
                          }`}
                        >
                          <div className="text-sm text-gray-600 mb-1">{msg.userEmail}</div>
                          <div className="text-gray-800">{msg.text}</div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 border rounded"
                      />
                      <button
                        type="button" // Change this to type="button"
                        onClick={handleStartListening} // Handle speech recognition
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 flex items-center"
                      >
                        🎙️ {/* You can use an icon or emoji for the mic */}
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionForum;
