import {USER_ROEL} from '../constants';

const initial = {
  isAuth: false,
  roel: USER_ROEL,
  id: null,
  email: null,
  name: null
}

const SET_AUTH = 'SET_AUTH';
const SET_USER = 'SET_USER';
const SET_ROEL = 'SET_ROEL';

export const userReducer = (state = initial, action) => {
  switch (action.type) {
    case (SET_AUTH): {
      return {
        ...state,
        isAuth: action.payload
      }
    }
    case (SET_USER): {
      const {id, email, name} = action.payload;

      return {
        ...state,
        id,
        email,
        name
      }
    }
    case (SET_ROEL): {
      return {
        ...state,
        roel: action.payload,
      }
    }

    default: {
      return state;
    }
  }
}

export const setAuthAC = (isAuth) => ({type: SET_AUTH, payload: isAuth})
export const setUserAC = (id, email, name) => ({type: SET_USER, payload: {id, email, name}});
export const setRoelAC = (roel) => ({type: SET_ROEL, payload: roel});

