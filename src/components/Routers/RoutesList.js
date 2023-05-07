import Home from '../../pages/Home/Home';
import Auth from '../../pages/Auth/Auth';

export const RoutesPublic = [
  {
    path: '/',
    component: <Home />
  },
  {
    path: '/auth/login',
    component: <Auth />
  },
  {
    path: '/auth/register',
    component: <Auth />
  }
]
