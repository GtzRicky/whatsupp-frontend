import {
  SET_CONVERSATION,
  SET_CONVERSATION_MESSAGES
} from "./types";

import authHeader from "../services/auth-header";
import axios from "axios";

export const setConversation = (conversationObj) => {
  return {
    type: SET_CONVERSATION,
    payload: conversationObj
  }
}

export const getMessages = (conversationId) => async (dispatch) => {
  const API_URL = "http://localhost:9000/api/v1/";

  try{
    //Obtener los mensajes de una conversación
    const response = await axios.get(`${API_URL}conversations/${conversationId}/messages`, { headers: authHeader() });
    dispatch(setConversationMessages(response.data.messages));
  }catch(error){
    console.log(error);
  }
}

export const setConversationMessages = (messages) => {
  return {
    type: SET_CONVERSATION_MESSAGES,
    payload: messages
  }
}