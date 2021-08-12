import { combineReducers } from "redux";
import { DispatchObj } from "../../Interfaces";
import { ActionTypes } from "../types";

function DataReducer(state = [], action: DispatchObj) {
  if (action.type === ActionTypes.FetchData) {
    return action.payload;
  }

  return state;
}

function AddSomethingReducer(state = {}, action: DispatchObj) {
  if (action.type === ActionTypes.AddNewItem) {}
  if (action.type === ActionTypes.AddComment) {}
  if (action.type === ActionTypes.DeleteComment) {}
  if (action.type === ActionTypes.DeleteItem) {}
  if (action.type === ActionTypes.ChangeItem) {}
  return state;
}

function CommentsReducer(state = [], action: DispatchObj) {
  if (action.type === ActionTypes.FetchComments) {
    return action.payload;
  }

  return state;
}

export default combineReducers({
  DataReducer,
  AddSomethingReducer,
  CommentsReducer,
});
