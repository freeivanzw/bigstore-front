import css from './Types.module.css';
import {useEffect} from 'react';
import TypeApi from '../../api/typeApi';
import {useDispatch, useSelector} from 'react-redux';
import {selectTypeAC, setAllTypesAC} from '../../store/typeReducer';

const Types = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.type.list);

  useEffect(() => {
    TypeApi.getAll().then((data) => {
      if (data.success) {
        dispatch(setAllTypesAC(data.types))
      }
    })
  }, [])

  const selectingType = (id) => {
    dispatch(selectTypeAC(id))
  }

  return <ul className={css.types}>
    {types.map((type) => <li key={type.id}><button
      className={[css.type_item, type.selected && css.active].join(' ')}
      onClick={() => selectingType(type.id)}
    >{type.name}</button></li>)}
  </ul>
}

export default Types;