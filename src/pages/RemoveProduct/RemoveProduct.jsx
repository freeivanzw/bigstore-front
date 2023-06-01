import css from './RemoveProduct.module.css';
import Container from '../../components/Container/Container';
import * as Yup from 'yup';
import {Form, Formik, useFormik} from 'formik';
import InputBox from '../../components/Form/InputBox/InputBox';
import Button from '../../components/Button/Button';
import productApi from '../../api/productApi';
import {useState} from 'react';
import Success from '../../components/Success/Success';

const RemoveProduct = () => {
  const [removeSuccess, setRemoveSuccess] = useState(false);

  const removeForm = useFormik({
    initialValues: {
      id: '',
    },
    validationSchema: Yup.object().shape({
      id: Yup.number().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      productApi.remove(values.id).then((data) => {
        setRemoveSuccess(true);
        resetForm();
        setTimeout(() => {
          setRemoveSuccess(false)
        }, 1000)
      })
    }
  })
  return <div>
    <Container>
      <span>Видалити товар</span>
      <Formik
        initialValues={removeForm.initialValues}
        onSubmit={removeForm.handleSubmit}
      >
        <Form>
          <InputBox
            label="ID продукту"
            name="id"
            type="number"
            value={removeForm.values.id}
            onChange={removeForm.handleChange}
            onBlur={removeForm.handleBlur}
            error={removeForm.errors.id && removeForm.touched.id}
          />
          <Button>Видалити</Button>
        </Form>
      </Formik>
    </Container>
    {removeSuccess && <Success>Товар видалено</Success>}
  </div>
}

export default RemoveProduct;