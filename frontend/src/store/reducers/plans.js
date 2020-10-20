import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  gb_used: 0,
  gb_total: 0,
  error: null,
  loading: false,
};

const planStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const planSuccess = (state, action) => {
  return updateObject(state, {
    gb_used: action.gb_used,
    gb_total: action.gb_total,
    error: null,
    loading: false,
  });
};

const planFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAN_START:
      return planStart(state, action);
    case actionTypes.PLAN_SUCCESS:
      return planSuccess(state, action);
    case actionTypes.PLAN_FAIL:
      return planFail(state, action);
    default:
      return state;
  }
};

export default reducer;
