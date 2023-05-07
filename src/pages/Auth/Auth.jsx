import * as Yup from 'yup';
import {Field, Form, Formik} from 'formik';
import css from './Auth.module.css';
import Container from '../../components/Container/Container';
import {NavLink, useLocation} from 'react-router-dom';
import InputBox from '../../components/Form/InputBox/InputBox';
import Button from '../../components/Button/Button';
import {BASE_URL} from '../../index';

const Auth = () => {
  const authAction = useLocation().pathname.split('/')[2];

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
  })

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
    retypePassword: Yup.string().required().oneOf([Yup.ref('password')])
  })

  const loginSubmit = (values) => {
    console.log(values)
  }

  const registerSubmit = (values) => {
    console.log(values)
  }

  return <div>
    <Container>
      {authAction === 'login'
        ? <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={loginSubmit}
        >
          {({ errors, touched }) => {
            return <Form className={css.auth_form}>
              <span className={css.auth_title}>Вхід</span>
              <InputBox
                label="email"
                name="email"
                error={errors.email && touched.email}
              />
              <InputBox
                label="Пароль"
                name="password"
                error={errors.password && touched.password}
              />
              <span className={css.auth_query}>Не має аккаунта? <NavLink to={BASE_URL + '/auth/register'}>Зареєструватись</NavLink></span>
              <Button>Увійти</Button>
            </Form>
          }}
        </Formik>
        : <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            retypePassword: ''
          }}
          validationSchema={RegisterSchema}
          onSubmit={registerSubmit}
        >
          {({ errors, touched }) => {
            return <Form className={css.auth_form}>
              <span className={css.auth_title}>Реєстрація</span>
              <InputBox
                label="Ім'я"
                name="name"
                error={errors.name && touched.name}
              />
              <InputBox
                label="email"
                name="email"
                error={errors.email && touched.email}
              />
              <InputBox
                label="Пароль"
                name="password"
                error={errors.password && touched.password}
              />
              <InputBox
                label="Повторіть пароль"
                name="retypePassword"
                error={errors.retypePassword && touched.retypePassword}
              />
              <span className={css.auth_query}>У вас є аккаунт? <NavLink to={BASE_URL + '/auth/login'}>Увійти</NavLink></span>
              <Button>Зареєстуватись</Button>
            </Form>
          }}
        </Formik>
      }
    </Container>
  </div>
}

export default Auth;