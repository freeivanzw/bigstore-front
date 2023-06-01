const initial = {
  currentPage: 1,
  totalPages: null,
  list: [],
  product: {
    id: null,
    name: null,
    image: null,
    price: null,
    BrandId: null,
    TypeId: null,
    infoList: [],
    rating: 0,
  },
}

const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_CATALOG_LIST = 'SET_LIST';
const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
const SET_PRODUCT = 'SET_PRODUCT';

export const catalogReducer = (state = initial, action) => {
  switch (action.type) {
    case (SET_CURRENT_PAGE): {
      return {
        ...state,
        currentPage: action.payload,
      }
    }
    case (SET_CATALOG_LIST): {
      return {
        ...state,
        list: action.payload,
      }
    }
    case (SET_TOTAL_PAGES): {
      return {
        ...state,
        totalPages: action.payload,
      }
    }
    case (SET_PRODUCT): {
      return {
        ...state,
        product: {
          ...state.product,
          id: action.payload.id,
          name: action.payload.name,
          image: action.payload.image,
          price: action.payload.price,
          BrandId: action.payload.BrandId,
          TypeId: action.payload.TypeId,
          rating: action.payload.rating,
          infoList: action.payload.infoList
        } ,
      }
    }

    default: {
      return state;
    }
  }
}

export const setCurrentPageAC = (page) => ({type: SET_CURRENT_PAGE, payload: page});
export const setCatalogListAC = (list) => ({type: SET_CATALOG_LIST, payload: list});
export const setTotalPagesAC = (total) => ({type: SET_TOTAL_PAGES, payload: total});
export const setProductAC = (product) => ({type: SET_PRODUCT, payload: product});