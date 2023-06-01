import css from './Brands.module.css';
import { useEffect } from 'react';
import BrandApi from '../../api/brandApi';
import {useDispatch, useSelector} from 'react-redux';
import {selectBrandAC, setAllBrandsAC} from '../../store/brandReducer';

const Brands = () => {
  const dispatch = useDispatch();
  const brandsList = useSelector((state) => state.brand.list);

  useEffect(() => {
    BrandApi.getAll().then((data) => {
      if (data.success) {
        dispatch(setAllBrandsAC(data.brands));
      }
    })
  }, [])

  const selectingBrand = (id) => {
    dispatch(selectBrandAC(id))
  }

  return <ul className={css.brands}>
    {brandsList.map((brand) => <li key={brand.id}><button
      data-brand-id={brand.id}
      className={[css.brand_item, brand.selected && css.active].join(' ')}
      onClick={() => selectingBrand(brand.id)}
    >{brand.name}</button></li>)}
  </ul>
}

export default Brands;