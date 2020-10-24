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
    gb_used: data[0]["fields"]["used"],
    gb_total: data[0]["fields"]["gb"]
  };
};

export const planATC = (item) => {
  return {
    type: actionTypes.PLAN_ATC,
    cart: item
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
          .post("http://127.0.0.1:8000/api/plans/list/", {
            'auth_token': token,
          })
          .then(function (res) {
            dispatch(planSuccess(res.data)); 
          })
          .catch(function (error) {
            dispatch(planFail(error));
          });
    }
  };
};

export const cartAdd = (item) => {
  return (dispatch) => {
    dispatch(planATC(item))
  }
}