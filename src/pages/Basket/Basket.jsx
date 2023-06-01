import css from './Basket.module.css';
import Container from '../../components/Container/Container';
import {useEffect, useState} from 'react';
import basketApi from '../../api/basketApi';
import {useDispatch, useSelector} from 'react-redux';
import {setCounterAC, setProductsAC} from '../../store/basketReducer';
import BasketItem from '../../components/BasketItem/BasketItem';
import Button from '../../components/Button/Button';
import Success from '../../components/Success/Success';

const Basket = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.basket.list);
  const email = useSelector((state) => state.user.email);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    basketApi.getProducts().then((data) => {
      dispatch(setProductsAC(data.rows));
    })
  }, [])

  const submitBasket = () => {

    const cartItemsToSend = Object.values(products.reduce((acc, item) => {
      if (acc[item.id]) {
        acc[item.id].count++;
      } else {
        acc[item.id] = {
          id: item.id,
          count: 1,
        };
      }
      return acc;
    }, {}));

    basketApi.createOrder(cartItemsToSend, email).then((data) => {
      if (data.success) {
        dispatch(setCounterAC(0))
        dispatch(setProductsAC([]))

        setOrderSuccess(true);
        setTimeout(() => {
          setOrderSuccess(false);
        }, 1000)
      }
    })
  }

  return <div>
    <Container>
      <span>Кошик</span>
      {products.length !== 0
        ? <>
          <ul className={css.basket_item_list}>
            {products.map((product) => <li key={product.basketDeviceId}>
              <BasketItem
                id={product.basketDeviceId}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            </li>)}
          </ul>
          <Button onClick={submitBasket}>Купити</Button>
        </>
        : <span>Кошик порожній, додайте будь ласка товар.</span>
      }
    </Container>
    {orderSuccess && <Success>Ваще замовлення прийнято</Success>}
  </div>
}

export default Basket;