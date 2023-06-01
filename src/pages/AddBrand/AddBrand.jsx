import * as Yup from 'yup';
import css from './AddBrand.module.css';
import Container from '../../components/Container/Container';
import {Form, Formik, useFormik} from 'formik';
import InputBox from '../../components/Form/InputBox/InputBox';
import Button from '../../components/Button/Button';
import {useState} from 'react';
import Success from '../../components/Success/Success';
import BrandApi from '../../api/brandApi';

const AddBrand = () => {
  const [addSuccess, setAddSuccess] = useState(false);

  const addBrandFrom = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
    }),
    onSubmit: (values) => {
      BrandApi.create(values.name).then((data) => {
        if (data.success) {
          setAddSuccess(true);

          setTimeout(() => {
            setAddSuccess(false);
          }, 1000)
        }
      });
    }
  })
  return <div>
    <Container>
      <span>Додати бренд</span>
      <Formik
        initialValues={addBrandFrom.initialValues}
        onSubmit={addBrandFrom.handleSubmit}
      >
        <Form>
          <InputBox
            label="Назва бренду"
            name="name"
            value={addBrandFrom.values.name}
            onChange={addBrandFrom.handleChange}
            error={addBrandFrom.errors.name && addBrandFrom.touched.name}
          />
          <Button>Створити</Button>
        </Form>
      </Formik>
    </Container>
    {addSuccess && <Success>Бренд створено</Success>}
  </div>
}

export default AddBrand;