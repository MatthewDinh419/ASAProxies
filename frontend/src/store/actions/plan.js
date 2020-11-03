import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as auth from "./auth";

export const planStart = () => {
  return {
    type: actionTypes.PLAN_START,
  };
};

export const planSuccess = (data) => {
  return {
    type: actionTypes.PLAN_SUCCESS,
    gb_used: data["gb_usage"],
    gb_total: data["gb_total"]
  };
};

export const planFail = (error) => {
  return {
    type: actionTypes.PLAN_FAIL,
    error: error
  };
};

export const planDetails = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    dispatch(planStart());
    if (token === undefined) {
      dispatch(auth.authFail());
    } else {
        axios
          .get("http://127.0.0.1:8000/api/sub-user-traffic/", {headers: {Authorization: `Token ${localStorage.getItem("token")}`}})
          .then(function (res) {
            dispatch(planSuccess(res.data)); 
          })
          .catch(function (error) {
            dispatch(planFail(error));
          });
    }
  };
};
