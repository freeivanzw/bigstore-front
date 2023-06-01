import Header from './components/Header/Header';
import Routers from './components/Routers/Routers';
import { useEffect } from 'react';
import userApi from './api/userApi';
import {setAuthAC, setRoelAC, setUserAC} from './store/userReducer';
import {useDispatch, useSelector} from 'react-redux';
import {ADMIN_ROEL} from './constants';
import basketApi from './api/basketApi';
import {setCounterAC} from './store/basketReducer';

function App() {
  const siteName = 'BigStore';
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect( () => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      userApi.auth(token).then((User) => {
        const {id, email, name, token} = User;

        localStorage.setItem('Authorization', 'Bearer ' + token);
        dispatch(setUserAC(id, email, name));
        dispatch(setAuthAC(true))

        if (User.roel === ADMIN_ROEL) {
          dispatch(setRoelAC(ADMIN_ROEL));
        }

      }).catch((e) => {
        console.log(e)
      });
    }

  }, [])

  useEffect(() => {
    if (isAuth) {
      basketApi.getProducts().then((data) => {
        dispatch(setCounterAC(data.count))

      })
    }
  }, [isAuth])

  return (
    <div className="App">
      <Header siteName={siteName}/>
      <Routers />
    </div>
  );
}

export default App;
