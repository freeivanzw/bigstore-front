const initial = {
  isAuth: false,
  id: null,
  email: null,
  name: null
}

const SET_AUTH = 'SET_AUTH';
const SET_USER = 'SET_USER';

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

    default: {
      return state;
    }
  }
}

export const setAuthAC = (isAuth) => ({type: SET_AUTH, payload: isAuth})
export const setUserAC = (id, email, name) => ({type: SET_USER, payload: {id, email, name}});

