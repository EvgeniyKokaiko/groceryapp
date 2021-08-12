import { Dispatch } from "redux";
import { DispatchObj, Item, ItemComment } from "../../Interfaces";
import axios from "axios";
import { ActionTypes } from "../types";

export const FetchData = () => async (dispatch: Dispatch<DispatchObj>) => {
  const response = await axios.get("http://localhost:8888/store");
  dispatch({ type: ActionTypes.FetchData, payload: response.data });
};

export const AddNewItem =
  (
    photo: string,
    name: string,
    description: string,
    quantity: number,
    color: string,
    weight: string,
    width: number,
    height: number,
    depth: number
  ) =>
  async (dispatch: Dispatch<DispatchObj>) => {
    await axios.post<Item>("http://localhost:8888/store", {
      photo: photo,
      name: name,
      description: description,
      quantity: quantity,
      color: color,
      weight: weight,
      size: { width, height, depth },
    });

    dispatch({ type: ActionTypes.AddNewItem });
  };

export const ChangeItem =
  (
    photo: string,
    name: string,
    description: string,
    quantity: number,
    color: string,
    weight: string,
    width: number,
    height: number,
    depth: number,
    id: string
  ) =>
  async (dispatch: Dispatch<DispatchObj>) => {
    await axios.patch<Item>(`http://localhost:8888/store/${id}`, {
      photo: photo,
      name: name,
      description: description,
      quantity: quantity,
      color: color,
      weight: weight,
      size: { width, height, depth },
    });

    dispatch({ type: ActionTypes.ChangeItem });
  };

export const DeleteItem =
  (id: number) => async (dispatch: Dispatch<DispatchObj>) => {
    /***
     *   This method realized to delete item, and clear every comment which relate with this item
     */

    const response = await axios.get(
      `http://localhost:8888/comments?productId=${id}`
    );
    response.data.map((el: ItemComment) => {
      return axios.delete(`http://localhost:8888/comments/${el.id}`);
    });
    await axios.delete(`http://localhost:8888/store/${id}`);
    dispatch({ type: ActionTypes.DeleteItem });
  };

export const FetchComments =
  (id: string) => async (dispatch: Dispatch<DispatchObj>) => {
    const response = await axios.get(
      `http://localhost:8888/comments?productId=${id}`
    );

    dispatch({ type: ActionTypes.FetchComments, payload: response.data });
  };

export const AddComment =
  (name: string, text: string, date: string, productId: string) =>
  async (dispatch: Dispatch<DispatchObj>) => {
    await axios.post(`http://localhost:8888/comments`, {
      name,
      text,
      date,
      productId,
    });

    dispatch({ type: ActionTypes.AddComment });
  };

export const DeleteComment =
  (id: number) => async (dispatch: Dispatch<DispatchObj>) => {
    await axios.delete(`http://localhost:8888/comments/${id}`);
    dispatch({ type: ActionTypes.DeleteComment });
  };
