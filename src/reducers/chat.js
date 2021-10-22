import {
  SET_CONVERSATION,
  SET_CONVERSATION_MESSAGES
} from "../actions/types";

const initialState = {
  actualConversation: {
    title: "Nombre de la sala",
    image_url: "",
    messages: []
  }
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
      case SET_CONVERSATION:
          return {
              ...state,
              actualConversation: {...payload, messages: []}
          };
      case SET_CONVERSATION_MESSAGES: 
          return {
            ...state,
            actualConversation: {...state.actualConversation, messages: payload}
          }
      default:
          return state;
  }
}
