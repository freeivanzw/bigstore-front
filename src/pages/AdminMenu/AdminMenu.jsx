import {NavLink} from 'react-router-dom';
import {
  ADD_BRAND_ROUTE,
  ADD_PRODUCT_ROUTE,
  ADD_TYPE_ROUTE,
  BASE_URL,
  DELETE_PRODUCT_ROUTE, REMOVE_BRAND_ROUTE,
  REMOVE_TYPE_ROUTE
} from '../../constants';
import Container from '../../components/Container/Container';

const AdminMenu = () => {
  return <div>
    <Container>
      <ul>
        <li><NavLink to={BASE_URL + ADD_PRODUCT_ROUTE}>Додати товар</NavLink></li>
        <li><NavLink to={BASE_URL + DELETE_PRODUCT_ROUTE}>Видалити товар</NavLink></li>
        <li><NavLink to={BASE_URL + ADD_TYPE_ROUTE}>Додати тип</NavLink></li>
        <li><NavLink to={BASE_URL + REMOVE_TYPE_ROUTE}>Видалити тип</NavLink></li>
        <li><NavLink to={BASE_URL + ADD_BRAND_ROUTE}>Додати бренд</NavLink></li>
        <li><NavLink to={BASE_URL + REMOVE_BRAND_ROUTE}>Видалити бренд бренд</NavLink></li>
      </ul>
    </Container>
  </div>
}

export default AdminMenu;