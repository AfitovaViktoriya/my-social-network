import { authAPI } from "../API/API";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: {userId, email, login, isAuth} });

export const authThunk = () => (dispatch) => {
  authAPI.auth().then(response => {
    if (response.data.resultCode === 0) {
      let {id, email, login} = response.data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  })
}

export const loginThunk = (email, password, rememberMe) => (dispatch) => {
  console.log(email, password, rememberMe)
  authAPI.login(email, password, rememberMe).then(response => {
    if (response.data.resultCode === 0) {
      dispatch(authThunk(response.data.userId));
    }
    console.log(response)
  })
}

export const logoutThunk = () => (dispatch) => {
  authAPI.logout().then(response => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
      console.log(response)
    }
  })
}

export default authReducer;
