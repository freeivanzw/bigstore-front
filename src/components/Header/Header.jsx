import Container from '../Container/Container';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import css from './Header.module.css';
import {BASE_URL, HOME_ROUTE, LOGIN_ROUTE} from '../../constants';
import {setAuthAC, setUserAC} from '../../store/userReducer';

const Header = (props) => {
  const { siteName } = props;

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);
  const userName = useSelector((state) => state.user.name);

  const logoutUser = () => {
    localStorage.clear('User-Token');
    dispatch(setUserAC(null, null, null));
    dispatch(setAuthAC(false))
  }

  return <header className={css.site_header}>
    <Container className={css.site_header_container}>
      <NavLink to={BASE_URL + HOME_ROUTE}>{siteName}</NavLink>
      {isAuth
        ? <div>
          <span>{userName}</span>
          <button onClick={logoutUser}>Вийти</button>
        </div>
        : <NavLink to={BASE_URL + LOGIN_ROUTE}>Увійти</NavLink>
      }
    </Container>
  </header>
}

export default Header;