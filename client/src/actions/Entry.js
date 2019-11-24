import axios from "axios";
import { ENTRY_DETAILS, EXIT_DETAILS, GET_DETAILS } from "./Types";
import { NotificationManager } from "react-notifications";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};
export const addEntry = FormData => async dispatch => {
  try {
    const body = JSON.stringify(FormData);
    const res = await axios.post("/api/entry", body, config);
    dispatch({
      type: ENTRY_DETAILS,
      payload: res.data
    });
    await NotificationManager.success("Submitted Successfully");
  } catch (err) {
    await NotificationManager.error("Server Error. Please try later.");
  }
};
export const endEntry = id => async dispatch => {
  try {
    const body = JSON.stringify({ entryId: id });
    const res = await axios.put("/api/entry", body, config);
    dispatch({
      type: EXIT_DETAILS,
      payload: res.data
    });
    await NotificationManager.success("Ended Session Successfully");
  } catch (err) {
    await NotificationManager.error("Server Error. Please try later.");
  }
};

export const getEntry = () => async dispatch => {
  try {
    const res = await axios.get("/api/entry");
    dispatch({
      type: GET_DETAILS,
      payload: res.data
    });
  } catch (err) {
    await NotificationManager.error("Server Error. Please try later.");
  }
};
