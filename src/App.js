import Header from './components/Header/Header';
import Routers from './components/Routers/Routers';
import { useEffect } from 'react';
import userApi from './api/userApi';
import {setAuthAC, setUserAC} from './store/userReducer';
import {useDispatch} from 'react-redux';

function App() {
  const siteName = 'BigStore';
  const dispatch = useDispatch();

  useEffect( () => {
    const token = localStorage.getItem('Authorization');
    if (token) {
      userApi.auth(token).then((User) => {
        const {id, email, name, token} = User;

        localStorage.setItem('Authorization', 'Bearer ' + token);
        dispatch(setUserAC(id, email, name));
        dispatch(setAuthAC(true))
      }).catch((e) => {
        console.log(e)
      });
    }

  }, [])

  return (
    <div className="App">
      <Header siteName={siteName}/>
      <Routers />
    </div>
  );
}

export default App;
