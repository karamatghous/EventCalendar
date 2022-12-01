import { SET_EVENT, UPDATE_EVENT, DELETE_EVENT } from "./types";

export const setEvent = (event) => {
  return {
    type: SET_EVENT,
    payload: event,
  };
};

export const updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
};

export const deleteEvent = (event) => {
  return {
    type: DELETE_EVENT,
    payload: event,
  };
};
