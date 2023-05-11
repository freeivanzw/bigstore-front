
import Container from '../../components/Container/Container';
import {Form, Formik, useFormik} from 'formik';
import InputBox from '../../components/Form/InputBox/InputBox';
import Button from '../../components/Button/Button';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import userApi from '../../api/userApi';
import {setUserAC} from '../../store/userReducer';

const EditUser = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name);
  const userEmail = useSelector((state) => state.user.email);

  const editFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      retypePassword: '',
    }
  })

  const submitEdit = async (values, {setErrors}) => {
    try {
      const { name, email, password } = editFormik.values;
      const editData = await userApi.edit(name, email, password);
      if (editData.success) {
        dispatch(setUserAC(editData.user.id, editData.user.email, editData.user.name));
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    editFormik.setFieldValue('name', userName, false)
    editFormik.setFieldValue('email', userEmail, false)
  }, [userName, userEmail])

  return <div>
    <Container>
      <Formik
        initialValues={editFormik.initialValues}
        onSubmit={submitEdit}
      >
        {({errors, touched}) => {
          return <Form>
            <span>Мій профіль</span>
            <InputBox
              label="Імя"
              name="name"
              type="text"
              value={editFormik.values.name}
              onChange={editFormik.handleChange}
              error={errors.email && touched.email}
            />
            <InputBox
              label="email"
              name="email"
              type="email"
              value={editFormik.values.email}
              onChange={editFormik.handleChange}
              error={errors.email && touched.email}
            />
            <InputBox
              label="Пароль"
              name="password"
              type="password"
              error={errors.password && touched.password}
            />
            <InputBox
              label="Повторіть пароль"
              name="retypePassword"
              type="password"
              error={errors.retypePassword && touched.retypePassword}
            />
            <Button>Змінити</Button>
          </Form>
        }}
      </Formik>
    </Container>
  </div>
}

export default EditUser;