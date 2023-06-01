const initial = {
  count: 0,
  list: [],
}

const SET_COUNTER = 'SET_COUNTER';
const COUNT_INCREMENT = 'COUNT_INCREMENT';
const COUNT_DECREMENT = 'COUNT_DECREMENT';
const SET_PRODUCTS = 'SET_PRODUCTS';
const REMOVE_ONE_PRODUCT = 'REMOVE_ONE_PRODUCT';

export const basketReducer = (state = initial, action) => {
  switch (action.type) {
    case (SET_COUNTER): {
      return {
        ...state,
        count: action.payload,
      }
    }

    case (COUNT_INCREMENT): {
      return {
        ...state,
        count: state.count + 1
      }
    }

    case (COUNT_DECREMENT): {
      if (state.count === 0) {
        return state;
      }

      return {
        ...state,
        count: state.count - 1
      }
    }

    case (SET_PRODUCTS): {
      return {
        ...state,
        list: action.payload,
      }
    }

    case (REMOVE_ONE_PRODUCT): {
      return {
        ...state,
        list: state.list.filter((product) => {
          if (product.basketDeviceId === action.payload) {
            return false;
          }

          return true;
        })
      }
    }

    default: {
      return state;
    }
  }
}

export const setCounterAC = (count) => ({type: SET_COUNTER, payload: count});
export const countIncrementAC = () => ({type: COUNT_INCREMENT});
export const countDecrementAC = () => ({type: COUNT_DECREMENT});
export const setProductsAC = (products) => ({type: SET_PRODUCTS, payload: products});
export const removeOneProductAC = (id) => ({type: REMOVE_ONE_PRODUCT, payload: id});
