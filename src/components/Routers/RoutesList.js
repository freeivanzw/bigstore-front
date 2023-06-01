import Home from '../../pages/Home/Home';
import Auth from '../../pages/Auth/Auth';
import {
  ADD_BRAND_ROUTE,
  ADD_PRODUCT_ROUTE, ADD_TYPE_ROUTE,
  ADMIN_MENU_ROUTE,
  BASE_URL, BASKET_ROUTE, DELETE_PRODUCT_ROUTE,
  EDIT_USER_ROUTE,
  HOME_CATALOG_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE, PRODUCT_ROUTE,
  REGISTER_ROUTE, REMOVE_BRAND_ROUTE, REMOVE_TYPE_ROUTE
} from '../../constants';
import EditUser from '../../pages/EditUser/EditUser';
import AdminMenu from '../../pages/AdminMenu/AdminMenu';
import AddProduct from '../../pages/AddProduct/AddProduct';
import RemoveProduct from '../../pages/RemoveProduct/RemoveProduct';
import AddType from '../../pages/AddType/AddType';
import RemoveType from '../../pages/RemoveType/RemoveType';
import AddBrand from '../../pages/AddBrand/AddBrand';
import RemoveBrand from '../../pages/RemoveBrand/RemoveBrand';
import Product from '../../pages/Product/Product';
import Basket from '../../pages/Basket/Basket';

export const RoutesPublic = [
  {
    path: BASE_URL + HOME_ROUTE,
    component: <Home />
  },
  {
    path: BASE_URL + HOME_CATALOG_ROUTE,
    component: <Home />
  },
  {
    path: BASE_URL + PRODUCT_ROUTE + '/:id',
    component: <Product />
  },
  {
    path: BASE_URL + LOGIN_ROUTE,
    component: <Auth />
  },
  {
    path: BASE_URL + REGISTER_ROUTE,
    component: <Auth />
  },
]

export const RoutesUser = [
  {
    path: BASE_URL + EDIT_USER_ROUTE,
    component: <EditUser />
  },
  {
    path: BASE_URL + BASKET_ROUTE,
    component: <Basket />
  }
]

export const RoutersAdmin = [
  {
    path: BASE_URL + ADMIN_MENU_ROUTE,
    component: <AdminMenu />,
  },
  {
    path: BASE_URL + ADD_PRODUCT_ROUTE,
    component: <AddProduct />,
  },
  {
    path: BASE_URL + DELETE_PRODUCT_ROUTE,
    component: <RemoveProduct />,
  },
  {
    path: BASE_URL + ADD_TYPE_ROUTE,
    component: <AddType />
  },
  {
    path: BASE_URL + REMOVE_TYPE_ROUTE,
    component: <RemoveType />
  },
  {
    path: BASE_URL + ADD_BRAND_ROUTE,
    component: <AddBrand />
  },
  {
    path: BASE_URL + REMOVE_BRAND_ROUTE,
    component: <RemoveBrand />
  }
]