const initial = {
  list: [],
}

const SET_ALL_BRANDS = 'SET_ALL_BRANDS';
const REMOVE_ONE_BRAND = 'REMOVE_ONE_BRAND';
const SELECT_BRAND = 'SELECT_BRAND';

export const brandReducer = (state = initial, action) => {
  switch (action.type) {
    case (SET_ALL_BRANDS): {
      return {
        ...state,
        list: action.payload
      }
    }
    case (REMOVE_ONE_BRAND): {
      const withoutBrand = state.list.filter((brand) => {
        if (brand.id === Number(action.payload)) {
          return false;
        }
        return true;
      })

      return {
        ...state,
        list: withoutBrand,
      }
    }
    case (SELECT_BRAND): {
      const withSelected = state.list.map((brand) => {
        if (brand.id === action.payload) {
          return {
            ...brand,
            selected: !brand.selected,
          }
        }
        return brand;
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

export const setAllBrandsAC = (brands) => ({type: SET_ALL_BRANDS, payload: brands});
export const removeOneBrandAC = (id) => ({type: REMOVE_ONE_BRAND, payload: id});
export const selectBrandAC = (id) => ({type: SELECT_BRAND, payload: id})