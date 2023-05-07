
import { Route, Routes } from 'react-router-dom';
import { RoutesPublic } from './RoutesList';

const Routers = () => {
  return <Routes>
    {RoutesPublic.map((route) => <Route key={route.path} path={route.path} element={route.component}  />)}
  </Routes>
}

export default Routers;