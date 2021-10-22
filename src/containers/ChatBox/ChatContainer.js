 import React, {useState} from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";

const ChatContainer = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {};

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
  );
};

export default ChatContainer;
