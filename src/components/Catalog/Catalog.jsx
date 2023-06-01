import css from './Catalog.module.css';
import {useEffect, useState} from 'react';
import productApi from '../../api/productApi';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setCatalogListAC, setCurrentPageAC, setTotalPagesAC} from '../../store/catalogReducer';
import {BASE_URL} from '../../constants';
import ReactPaginate from 'react-paginate';
import CatalogItem from '../CatalogItem/CatalogItem';

const Catalog = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.catalog.list);
  const totalPages = useSelector((state) => state.catalog.totalPages);
  const currentPage = useSelector((state) => state.catalog.currentPage);
  const types = useSelector((state) => state.type.list);
  const brands = useSelector((state) => state.brand.list);
  const limit = 5;
  const {page} = useParams();
  const history = useNavigate();

  const selectedTypes = types.filter((type) => type.selected).map((type) => type.id)
  const selectedBrands = brands.filter((brand) => brand.selected).map((brand) => brand.id);

  useEffect(() => {
    dispatch(setCurrentPageAC(+page))
  },[page])

  useEffect(() => {
    productApi.getAll(currentPage, limit, selectedTypes, selectedBrands).then((data) => {
      if (data.success) {
        dispatch(setCatalogListAC(data.products))
        dispatch(setTotalPagesAC(data.totalPages))
      }
    });
  }, [currentPage, types, brands])

  const changePage = ({selected}) => {
    dispatch(setCurrentPageAC(++selected))
    history(BASE_URL + '/' + selected)
  }
  return <section className={css.catalog}>
    <ul className={css.catalog_list}>
      {productList.map((product) => <li key={product.id}><CatalogItem {...product} /></li>)}
    </ul>
    <ReactPaginate
      className="navigation"
      breakLabel="..."
      nextLabel=">"
      onPageChange={changePage}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      initialPage={parseInt(currentPage) - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  </section>
}

export default Catalog;