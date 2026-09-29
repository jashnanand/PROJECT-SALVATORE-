import { useState } from "react";
import { Send, User, HeartHandshake } from "lucide-react";
import Navbar from "../components/Navbar";

function Messages() {
  const savedUser = localStorage.getItem("salvatoreUser");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("salvatoreMessages");

    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            sender: "counsellor",
            text: "Hello! How are you feeling today? 😊",
          },
        ];
  });

  const [newMessage, setNewMessage] = useState("");

  const isStudent = user?.role === "student";

  const otherPerson = isStudent
    ? {
        name: "Dr. Priya Sharma",
        role: "Counsellor",
      }
    : {
        name: "Rahul Kumar",
        role: "Student",
      };

  function handleSend(e) {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const updatedMessages = [
      ...messages,
      {
        sender: user?.role,
        text: newMessage,
      },
    ];

    setMessages(updatedMessages);

    localStorage.setItem(
      "salvatoreMessages",
      JSON.stringify(updatedMessages)
    );

    setNewMessage("");
  }

  return (
    <>
      <Navbar />

      <main className="messages-page">
        <div className="chat-container">
          
          <div className="chat-header">
            <div className="chat-profile-icon">
              {isStudent ? (
                <HeartHandshake size={28} />
              ) : (
                <User size={28} />
              )}
            </div>

            <div>
              <h2>{otherPerson.name}</h2>

              <p>
                <span className="online-dot"></span>
                Available now
              </p>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => {
              const isMyMessage =
                message.sender === user?.role;

              return (
                <div
                  key={index}
                  className={`message-row ${
                    isMyMessage ? "my-message-row" : ""
                  }`}
                >
                  <div
                    className={`message-bubble ${
                      isMyMessage ? "my-message" : "other-message"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              );
            })}
          </div>

          <form className="message-input-area" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Write a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />

            <button type="submit">
              <Send size={20} />
            </button>
          </form>

        </div>
      </main>
    </>
  );
}

export default Messages;