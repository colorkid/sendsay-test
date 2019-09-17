import { ACTION_TYPE } from "./constants";

export const addNewMessage = (message) => {
  return {
    type: ACTION_TYPE.ADD_MESSAGE,
    payload: message
  }
};

export const updateMessage = (id, status) => {
  return {
    type: ACTION_TYPE.UPDATE_MESSAGE,
    payload: {
      id: id,
      status: status
    }
  }
};