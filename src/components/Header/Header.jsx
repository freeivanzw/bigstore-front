import Container from '../Container/Container';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import css from './Header.module.css';
import {
  ADMIN_MENU_ROUTE,
  ADMIN_ROEL,
  BASE_URL, BASKET_ROUTE,
  EDIT_USER_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  USER_ROEL
} from '../../constants';
import {setAuthAC, setRoelAC, setUserAC} from '../../store/userReducer';
import Button from '../Button/Button';
import sprite from '../../static/image/sprite.svg';
import Icon from '../Icon/Icon';

const Header = (props) => {
  const { siteName } = props;

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const userName = useSelector((state) => state.user.name);
  const roel = useSelector((state) => state.user.roel);
  const basketCounter = useSelector((state) => state.basket.count);

  const logoutUser = () => {
    localStorage.clear('User-Token');
    dispatch(setUserAC(null, null, null));
    dispatch(setAuthAC(false));
    dispatch(setRoelAC(USER_ROEL));
  }

  return <header className={css.site_header}>
    <Container className={css.site_header_container}>
      <NavLink to={BASE_URL + HOME_ROUTE} className={css.site_logo}>{siteName}</NavLink>
      {isAuth
        ? <div className={css.user_panel}>

          {roel === ADMIN_ROEL && <NavLink to={BASE_URL + ADMIN_MENU_ROUTE} className={css.admin_link}>Адмін панель</NavLink>}

          <NavLink to={BASE_URL + BASKET_ROUTE} className={css.basket_btn}>
            <Icon name="basket"/>
            {basketCounter !== 0 && <b>{basketCounter}</b>}
          </NavLink>
          <NavLink to={BASE_URL + EDIT_USER_ROUTE} className={css.user_name} >{userName}</NavLink>
          <Button onClick={logoutUser}>
            <Icon name="logout"/>
            Вийти</Button>
        </div>
        : <NavLink to={BASE_URL + LOGIN_ROUTE}>Увійти</NavLink>
      }
    </Container>
  </header>
}

export default Header;