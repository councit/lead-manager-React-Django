import axios from "axios";
import { returnErrors } from "./messages";
import { USER_LOADED, USER_LOADING, AUTH_ERROR } from "./types";

// CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // USER LOADING
  dispatch({ type: USER_LOADING });

  // GET TOKEN FROM STATE
  const token = getState().auth.token;

  // HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // IF TOKEN ADD TO HEADERS CONFIG
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("/api/auth/user", config)
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};
