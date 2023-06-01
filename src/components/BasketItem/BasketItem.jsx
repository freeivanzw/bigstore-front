import css from './BasketItem.module.css';
import {UPLOAD_URL} from '../../constants';
import basketApi from '../../api/basketApi';
import {useDispatch} from 'react-redux';
import {countDecrementAC, removeOneProductAC} from '../../store/basketReducer';

const BasketItem = (props) => {
  const dispatch = useDispatch();
  const {id, name, image, price} = props;

  const removeBasketItem = (id, poductId) => {
    basketApi.removeProduct(id).then((data) => {
      if (data.success) {
        dispatch(removeOneProductAC(id));
        dispatch(countDecrementAC());
      }
    })
  }

  return <div className={css.basket_item}>
    <img src={UPLOAD_URL + 'products/' + image} width="100" height="100" alt={name}/>
    <span>{name}</span>
    <b>{price}</b>
    <button onClick={() => removeBasketItem(id)}>delete</button>
  </div>
}

export default BasketItem;
