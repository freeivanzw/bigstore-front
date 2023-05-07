import Container from '../Container/Container';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import css from './Header.module.css';

const Header = (props) => {
  const { siteName } = props;

  const isAuth = useSelector((state) => state.user.isAuth);
  const userName = useSelector((state) => state.user.name);


  return <header className={css.site_header}>
    <Container className={css.site_header_container}>
      <NavLink to="/">{siteName}</NavLink>
      {isAuth
        ? <div>
          <span>{userName}</span>
          <button>Вийти</button>
        </div>
        : <NavLink to="auth/login">Увійти</NavLink>
      }
    </Container>
  </header>
}

export default Header;