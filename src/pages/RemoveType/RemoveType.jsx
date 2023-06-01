import * as Yup from 'yup';
import css from './RemoveType.module.css';
import Container from '../../components/Container/Container';
import {useEffect, useState} from 'react';
import TypeApi from '../../api/typeApi';
import {removeOneTypeAC, setAllTypesAC} from '../../store/typeReducer';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik, useFormik} from 'formik';
import InputBox from '../../components/Form/InputBox/InputBox';
import Dropdown from '../../components/Dropdown/Dropdown';
import Button from '../../components/Button/Button';
import Success from '../../components/Success/Success';

const RemoveType = () => {
  const dispatch = useDispatch();
  const [removeSuccess, setRemoveSuccess] = useState();
  const types = useSelector((state) => state.type.list);

  useEffect(() => {
    TypeApi.getAll().then((data) => {
      if (data.success) {
        dispatch(setAllTypesAC(data.types))
      }
    })
  }, [])

  const removeTypeFrom = useFormik({
    initialValues: {
      id: undefined,
    },
    validationSchema: Yup.object().shape({
      id: Yup.number().required(),
    }),
    onSubmit: (values) => {
      TypeApi.remove(values.id).then((data) => {
        if (data.success) {
          setRemoveSuccess(true);

          setTimeout(() => {
            setRemoveSuccess(false);
          }, 100);

        }
      })
      dispatch(removeOneTypeAC(values.id));
    }
  })

  return <div>
    <Container>
      <span>Видалити тип</span>
      <Formik
        initialValues={removeTypeFrom.initialValues}
        onSubmit={removeTypeFrom.handleSubmit}
      >
        <Form>
          <Dropdown
            label="Виберіть тип"
            name="id"
            value={removeTypeFrom.values.id}
            onChange={removeTypeFrom.handleChange}
            onBlur={removeTypeFrom.handleBlur}
            options={types}
          />
          <Button>Видалити тип</Button>
        </Form>
      </Formik>
    </Container>
    {removeSuccess && <Success>Тип видалено</Success>}
  </div>
}

export default RemoveType;