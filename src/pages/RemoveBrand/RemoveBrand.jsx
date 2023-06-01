import * as Yup from 'yup';
import css from './RemoveBrand.module.css';
import Container from '../../components/Container/Container';
import {useEffect, useState} from 'react';
import {Form, Formik, useFormik} from 'formik';
import BrandApi from '../../api/brandApi';
import {removeOneBrandAC, setAllBrandsAC} from '../../store/brandReducer';
import {useDispatch, useSelector} from 'react-redux';
import Dropdown from '../../components/Dropdown/Dropdown';
import Button from '../../components/Button/Button';
import Success from '../../components/Success/Success';

const RemoveBrand = () => {
  const dispatch = useDispatch();
  const [removeSuccess, setRemoveSuccess] = useState(false);
  const brandList = useSelector((state) => state.brand.list);

  useEffect(() => {
    BrandApi.getAll().then((data) => {
      if (data.success) {
        dispatch(setAllBrandsAC(data.brands));
      }
    })
  }, [])

  const removeBrandForm = useFormik({
    initialValues: {
      id: undefined,
    },
    validationSchema: Yup.object().shape({
      id: Yup.number().required(),
    }),
    onSubmit: (values) => {
      BrandApi.remove(Number(values.id)).then((data) => {
        if (data.success) {
          setRemoveSuccess(true);

          console.log(data)
          setTimeout(() => {
            setRemoveSuccess(false);
          }, 1000)

          dispatch(removeOneBrandAC(values.id));
        }
      })
    }
  })

  return <div>
    <Container>
      <span>Видалити бренд</span>
      <Formik
        initialValues={removeBrandForm.initialValues}
        onSubmit={removeBrandForm.handleSubmit}
      >
       <Form>
         <Dropdown
           label="Виберіть бренд"
           name="id"
           value={removeBrandForm.values.id}
           onChange={removeBrandForm.handleChange}
           onBlur={removeBrandForm.handleBlur}
           options={brandList}
         />
         <Button>Видалити</Button>
       </Form>
      </Formik>
    </Container>
    {removeSuccess && <Success>Бренд видалено</Success>}
  </div>
}

export default RemoveBrand;