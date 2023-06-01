import css from './CatalogItem.module.css';
import {NavLink} from 'react-router-dom';
import {BASE_URL, PRODUCT_ROUTE, UPLOAD_URL} from '../../constants';

const CatalogItem = (props) => {
  const {id, name, price, image} = props;

  return <div className={css.catalog_item}>
    <img src={UPLOAD_URL + 'products/' + image} width="150" height="150" alt={name}/>
    <i>арт. {id}</i>
    <NavLink to={BASE_URL + PRODUCT_ROUTE + '/' + id}>{name}</NavLink>
    <span>{price} грн.</span>
  </div>
}

export default CatalogItem;