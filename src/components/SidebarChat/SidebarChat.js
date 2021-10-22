import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";
import { useDispatch } from "react-redux";
import {setConversation, getMessages} from "../../actions/chat";

const SidebarChat = ({conversation}) => {

  const dispatch = useDispatch();

  const handleConversation = (e, conversationObj) => {
    console.log(conversationObj)
    dispatch(setConversation(conversationObj)); //Fijar la conversación en el estado global
    dispatch(getMessages(conversationObj.id)); //Obtener los mensajes
  }

  return (
    <div className="sidebarChat" onClick={(e) => handleConversation(e, conversation)}>
      <Avatar src={conversation.image_url} />
      <div className="sidebarChat__info">
        <h2>{conversation.title}</h2>
        <p>Último mensaje</p>
      </div>
    </div>
  );
};
export default SidebarChat;
