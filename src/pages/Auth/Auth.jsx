import * as Yup from 'yup';
import {Form, Formik, useFormik} from 'formik';
import css from './Auth.module.css';
import Container from '../../components/Container/Container';
import {NavLink, Navigate, useLocation} from 'react-router-dom';
import InputBox from '../../components/Form/InputBox/InputBox';
import Button from '../../components/Button/Button';
import {BASE_URL, HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE} from '../../constants';
import userApi from '../../api/userApi';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthAC, setUserAC} from '../../store/userReducer';


const Auth = () => {
  const dispatch = useDispatch();
  const authAction = useLocation().pathname.split('/')[2];
  const isAuth = useSelector((state) => state.user.isAuth);


  const LoginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    }),
    onSubmit: async (values, {setErrors}) => {
      try {
        const {email, password} = values;

        const User = await userApi.login(email, password);

        if (User.success) {
          const {id, email, name, token} = User;

          localStorage.setItem('Authorization', 'Bearer ' + token);
          dispatch(setUserAC(id, email, name));
          dispatch(setAuthAC(true))
        }
      } catch (e) {
        console.log(e)
        setErrors({
          email: 'email error',
          password: 'password error'
        })
      }
    }
  })

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    retypePassword: Yup.string().required().oneOf([Yup.ref('password')])
  })

  const RegisterFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      retypePassword: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, {setErrors}) => {
      try {
        const {name, email, password} = values;

        const User = await userApi.register(name, email, password);

        if (User.success) {
          const {id, email, name, token} = User;

          localStorage.setItem('Authorization', 'Bearer ' + token);
          dispatch(setUserAC(id, email, name));
          dispatch(setAuthAC(true))
        }

      } catch (e) {
        console.log(e)
        setErrors({
          name: 'name error',
          email: 'email error',
          password: 'password error',
          retypePassword: 'password error'
        })
      }
    }

  })

  if (isAuth) {
    return <Navigate to={BASE_URL + HOME_ROUTE} />
  }

  return <div>
    <Container>
      {authAction === 'login'
        ? <Formik
          initialValues={LoginFormik.initialValues}
          onSubmit={LoginFormik.handleSubmit}
        >
          {({ errors, touched }) => {
            return <Form className={css.auth_form}>
              <span className={css.auth_title}>Вхід</span>
              <InputBox
                label="email"
                name="email"
                type="email"
                value={LoginFormik.values.email}
                onChange={LoginFormik.handleChange}
                onBlur={LoginFormik.handleBlur}
                error={LoginFormik.errors.email && LoginFormik.touched.email}
              />
              <InputBox
                label="Пароль"
                name="password"
                type="password"
                value={LoginFormik.values.password}
                onChange={LoginFormik.handleChange}
                onBlur={LoginFormik.handleBlur}
                error={LoginFormik.errors.password && LoginFormik.touched.password}
              />
              <span className={css.auth_query}>Не має аккаунта? <NavLink to={BASE_URL + REGISTER_ROUTE}>Зареєструватись</NavLink></span>
              <Button>Увійти</Button>
            </Form>
          }}
        </Formik>
        : <Formik
          initialValues={RegisterFormik.initialValues}
          onSubmit={RegisterFormik.handleSubmit}
        >
          {({ errors, touched }) => {
            return <Form className={css.auth_form}>
              <span className={css.auth_title}>Реєстрація</span>
              <InputBox
                label="Ім'я"
                name="name"
                type="text"
                value={RegisterFormik.values.name}
                onChange={RegisterFormik.handleChange}
                onBlur={RegisterFormik.handleBlur}
                error={RegisterFormik.errors.name && RegisterFormik.touched.name}
              />
              <InputBox
                label="email"
                name="email"
                type="email"
                value={RegisterFormik.values.email}
                onChange={RegisterFormik.handleChange}
                onBlur={RegisterFormik.handleBlur}
                error={RegisterFormik.errors.email && RegisterFormik.touched.email}
              />
              <InputBox
                label="Пароль"
                name="password"
                type="password"
                value={RegisterFormik.values.password}
                onChange={RegisterFormik.handleChange}
                onBlur={RegisterFormik.handleBlur}
                error={RegisterFormik.errors.password && RegisterFormik.touched.password}
              />
              <InputBox
                label="Повторіть пароль"
                name="retypePassword"
                type="password"
                value={RegisterFormik.values.retypePassword}
                onChange={RegisterFormik.handleChange}
                onBlur={RegisterFormik.handleBlur}
                error={RegisterFormik.errors.retypePassword && RegisterFormik.touched.retypePassword}
              />
              <span className={css.auth_query}>У вас є аккаунт? <NavLink to={BASE_URL + LOGIN_ROUTE}>Увійти</NavLink></span>
              <Button>Зареєстуватись</Button>
            </Form>
          }}
        </Formik>
      }
    </Container>
  </div>
}

export default Auth;