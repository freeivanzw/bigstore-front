import * as Yup from 'yup';
import css from './AddType.module.css';
import Container from '../../components/Container/Container';
import {Form, Formik, useFormik} from 'formik';
import InputBox from '../../components/Form/InputBox/InputBox';
import Button from '../../components/Button/Button';
import TypeApi from '../../api/typeApi';
import {useState} from 'react';
import Success from '../../components/Success/Success';

const AddType = () => {
  const [addSuccess, setAddSuccess] = useState(false);

  const addTypeFrom = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
    }),
    onSubmit: (values) => {
      TypeApi.create((values.name)).then((data) => {
        if (data.success) {
          setAddSuccess(true)

          setTimeout(() => {
            setAddSuccess(false)
          }, 1000)
        }
      })
    }
  })

  return <div>
    <Container>
      <span>Додати тип</span>
      <Formik
        initialValues={addTypeFrom.initialValues}
        onSubmit={addTypeFrom.handleSubmit}
      >
        <Form>
          <InputBox
            label="Назва"
            name="name"
            type="text"
            value={addTypeFrom.values.name}
            onChange={addTypeFrom.handleChange}
            onBlur={addTypeFrom.handleBlur}
            error={addTypeFrom.errors.name && addTypeFrom.touched.name}
          />
          <Button>Створити</Button>
        </Form>
      </Formik>
    </Container>
    {addSuccess && <Success>Тип додано</Success>}
  </div>
}

export default AddType;