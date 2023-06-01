
import { Route, Routes } from 'react-router-dom';
import {RoutersAdmin, RoutesPublic, RoutesUser} from './RoutesList';
import NotFound from '../NotFound/NotFound';
import {useSelector} from 'react-redux';
import {ADMIN_ROEL} from '../../constants';

const Routers = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const roel = useSelector((state) => state.user.roel);

  return <Routes>
    {RoutesPublic.map((route) => <Route key={route.path} path={route.path} element={route.component}  />)}

    {isAuth ? RoutesUser.map((route) => <Route key={route.path} path={route.path} element={route.component}  />) : ''}

    {roel === ADMIN_ROEL ? RoutersAdmin.map((route) => <Route key={route.path} path={route.path} element={route.component}  />) : ''}

    <Route path='*' element={<NotFound />}/>
  </Routes>
}

export default Routers;