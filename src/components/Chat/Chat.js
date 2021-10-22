import React, { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import "./Chat.css";
import MicIcon from "@material-ui/icons/Mic";
import { useSelector } from "react-redux";

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const { actualConversation } = useSelector((state) => state.chat);
  const { user: data } = useSelector((state) => state.auth);

  console.log(actualConversation);

  const sendMessage = async (e) => {
    e.preventDefault();

    setInput("");
  };
  
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={actualConversation.image_url} />
        <div className="chat__headerInfo">
          <h3>{actualConversation.title}</h3>
          <p>Visto por ultima vez a las... </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {actualConversation.messages.map((e, i) => {
          return (
            <p
              key={i}
              className={`chat__message ${
                e.sender_id === data.user.id  && "chat__reciever"
              }`}
            >
              <span className="chat__name">{e.sender.firstname} {e.sender.lastname}</span>
              {e.message}
              <span className="chat__timestamp">{e.created_at}</span>
            </p>
          );
        })}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Escribe un mensaje"
          />
          <button onClick={sendMessage} type="submit">
            Enviar
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
