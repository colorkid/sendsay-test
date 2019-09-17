import { ACTION_TYPE } from "./constants";

const DEFAULT_STATE = [];

export const messagesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_MESSAGE:
      return addMessage(state, action);
    case ACTION_TYPE.UPDATE_MESSAGE:
    	return updateMessage(state, action.payload);
    default:
      return state
  }
};

const addMessage = (state, action) => {
  if (state.find(message => message.id === action.payload.id) !== undefined) {
    return [...state];
  }
  return [...state, action.payload];
};

const updateMessage = (state, payload) => {
  return state.map(message => {
    if (message.id === payload.id) message.status = payload.status;
    return message;
  })
};