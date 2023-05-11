import Home from '../../pages/Home/Home';
import Auth from '../../pages/Auth/Auth';
import {BASE_URL, EDIT_USER_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE} from '../../constants';
import EditUser from '../../pages/EditUser/EditUser';

export const RoutesPublic = [
  {
    path: BASE_URL + HOME_ROUTE,
    component: <Home />
  },
  {
    path: BASE_URL + LOGIN_ROUTE,
    component: <Auth />
  },
  {
    path: BASE_URL + REGISTER_ROUTE,
    component: <Auth />
  },
  {
    path: BASE_URL + EDIT_USER_ROUTE,
    component: <EditUser />
  }
]
