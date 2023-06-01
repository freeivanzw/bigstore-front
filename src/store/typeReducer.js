const initial = {
  list: [],
}

const SET_ALL_TYPES = 'SET_ALL_TYPES';
const REMOVE_ONE_TYPE = 'REMOVE_ONE_TYPE';
const SELECT_TYPE = 'SELECT_TYPE';

export const typeReducer = (state = initial, action) => {
  switch (action.type) {
    case (SET_ALL_TYPES): {
      return {
        ...state,
        list: action.payload,
      }
    }
    case (REMOVE_ONE_TYPE): {
      const withoutType = state.list.filter((type) => {
        if (type.id === Number(action.payload)) {
          return false;
        }

        return true;
      })
      return {
        ...state,
        list: withoutType
      }
    }
    case (SELECT_TYPE): {
      const withSelected = state.list.map((type) => {
        if (type.id === action.payload) {
          return {
            ...type,
            selected: !type.selected,
          }
        }
        return type;
      })

      return {
        ...state,
        list: withSelected,
      }
    }

    default: {
      return state;
    }
  }
}

export const setAllTypesAC = (types) => ({type: SET_ALL_TYPES, payload: types});
export const removeOneTypeAC = (id) => ({type: REMOVE_ONE_TYPE, payload: id});
export const selectTypeAC = (id) => ({type: SELECT_TYPE, payload: id});