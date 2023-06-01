import css from './Product.module.css';
import Container from '../../components/Container/Container';
import {useEffect, useState} from 'react';
import ProductApi from '../../api/productApi';
import {NavLink, useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setProductAC} from '../../store/catalogReducer';
import {BASE_URL, LOGIN_ROUTE, UPLOAD_URL} from '../../constants';
import Success from '../../components/Success/Success';
import basketApi from '../../api/basketApi';
import {countIncrementAC} from '../../store/basketReducer';

const Product = () => {
  const productId = useParams().id;
  const dispatch = useDispatch();
  const device = useSelector((state) => state.catalog.product);
  const isAuth = useSelector((state) => state.user.isAuth);
  const [addedToCard, setAddedToCart] = useState(false);

  useEffect(() => {
    ProductApi.getById(productId).then((data) => {
      if (data.success) {
        dispatch(setProductAC(data.device));
      }
    })
  }, [])

  const toCart = (id) => {
    basketApi.toCart(id).then((data) => {
      if (data.success) {
        dispatch(countIncrementAC())
      }
    })
  }

  return <div>
    <Container>
      {device.image && <img src={`${UPLOAD_URL}products/${device.image}`} width="200" height="200" alt={device.name}/>}
      <h1>{device.name}</h1>
      <span>{device.price} грн.</span>
      {isAuth
        ? <button onClick={() => toCart(device.id)}>Купити</button>
        : <span>Щоб купити товар <NavLink to={BASE_URL + LOGIN_ROUTE}>Увійдіть</NavLink></span>
      }

      {device.infoList && <table>
        <tbody>
          {device.infoList.map((info) => <tr key={info.id}><td>{info.title}</td><td>{info.description}</td></tr>)}
        </tbody>
      </table>}

    </Container>
    {addedToCard && <Success>Товар додано в кошик</Success>}
  </div>
}

export default Product