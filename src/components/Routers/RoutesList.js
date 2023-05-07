import Home from '../../pages/Home/Home';
import Auth from '../../pages/Auth/Auth';
import {BASE_URL} from '../../index';

export const RoutesPublic = [
  {
    path: BASE_URL + '/',
    component: <Home />
  },
  {
    path: BASE_URL + '/auth/login',
    component: <Auth />
  },
  {
    path: BASE_URL + '/auth/register',
    component: <Auth />
  }
]
