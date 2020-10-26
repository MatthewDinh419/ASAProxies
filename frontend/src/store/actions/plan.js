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
    gb_used: data[0]["used"],
    gb_total: data[0]["gb"]
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
    if (token === undefined) {
      dispatch(auth.authFail());
    } else {
        axios
          .get("http://127.0.0.1:8000/api/plans/list/", {headers: {Authorization: `Token ${localStorage.getItem("token")}`}})
          .then(function (res) {
            dispatch(planSuccess(res.data)); 
          })
          .catch(function (error) {
            dispatch(planFail(error));
          });
    }
  };
};
