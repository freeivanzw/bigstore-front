const initial = {
  isAuth: false,
  id: null,
  email: null,
  name: null
}

const SET_AUTH = 'SET_AUTH';

export const userReducer = (state = initial, action) => {
  switch (action.type) {
    case (SET_AUTH): {
      return {
        ...state,
        isAuth: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export const setAuthAC = (isAuth) => ({type: SET_AUTH, payload: isAuth})

