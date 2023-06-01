import * as Yup from 'yup';
import Container from '../../components/Container/Container';
import {Field, Form, Formik, useFormik} from 'formik';
import InputBox from '../../components/Form/InputBox/InputBox';
import Button from '../../components/Button/Button';
import productApi from '../../api/productApi';
import {useEffect, useState} from 'react';
import BrandApi from '../../api/brandApi';
import {setAllBrandsAC} from '../../store/brandReducer';
import TypeApi from '../../api/typeApi';
import {setAllTypesAC} from '../../store/typeReducer';
import {useDispatch, useSelector} from 'react-redux';
import Dropdown from '../../components/Dropdown/Dropdown';
import FormImage from '../../components/FormImage/FormImage';
import Success from '../../components/Success/Success';

const AddProduct = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.type.list);
  const brands = useSelector((state) => state.brand.list);
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    BrandApi.getAll().then((data) => {
      if (data.success) {
        dispatch(setAllBrandsAC(data.brands));
      }
    })
    TypeApi.getAll().then((data) => {
      if (data.success) {
        dispatch(setAllTypesAC(data.types))
      }
    })
  }, [])

  const createProduct = useFormik({
    initialValues: {
      name: '',
      price: 0,
      image: undefined,
      TypeId: undefined,
      BrandId: undefined,
      infoTitle: '',
      infoDescription: '',
      infoList: [],
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().min(1).required(),
      TypeId: Yup.number(),
      BrandId: Yup.number(),
      image: Yup.mixed().required()
        .test('fileType', 'JPEG or PNG', (value) => {
          if (value) {
            return ['image/jpeg', 'image/png'].includes(value.type);
          }
          return true;
        }),
    }),
    onSubmit: (values, {setErrors, resetForm}) => {
      console.log(values)

      productApi.create(values).then((data) => {
        resetForm();
        setAddSuccess(true);

        setTimeout(() => {
          setAddSuccess(false);
        }, 1000);
      }).catch((error) => {
        setErrors({
          name: 'error name',
          price: 'error price',
          image: 'error image',
        })
      })
    },
  })

  const addDesc = (e) => {
    e.preventDefault();

    if (createProduct.values.infoTitle && createProduct.values.infoDescription) {

      const newInfoList = [
        ...createProduct.values.infoList,
        {
          id: new Date().getTime().toString(),
          title: createProduct.values.infoTitle,
          description: createProduct.values.infoDescription
        }
      ]
      createProduct.setValues({
        ...createProduct.values,
        infoTitle: '',
        infoDescription: '',
        infoList: newInfoList
      })

    }
  }

  const deleteDesk = (e, id) => {
    e.preventDefault();
    const newInfoList = createProduct.values.infoList.filter((info) => {
      if (info.id === id) {
        return false;
      }

      return true;
    })

    createProduct.setValues({
      ...createProduct.values,
      infoList: newInfoList
    })
  }

  return <div>
    <Container>
      <Formik
        initialValues={createProduct.initialValues}
        onSubmit={createProduct.handleSubmit}
      >
        <Form>
          <InputBox
            label="Назва"
            name="name"
            type="text"
            value={createProduct.values.name}
            onChange={createProduct.handleChange}
            onBlur={createProduct.handleBlur}
            error={createProduct.errors.name && createProduct.touched.name}
          />
          <InputBox
            label="Ціна"
            name="price"
            type="number"
            value={createProduct.values.price}
            onChange={createProduct.handleChange}
            onBlur={createProduct.handleBlur}
            error={createProduct.errors.price && createProduct.touched.price}
          />
          <Dropdown
            label="Типи"
            name="TypeId"
            value={createProduct.values.TypeId}
            onChange={createProduct.handleChange}
            onBlur={createProduct.handleBlur}
            options={types}
          />
          <Dropdown
            label="Бренди"
            name="BrandId"
            value={createProduct.values.BrandId}
            onChange={createProduct.handleChange}
            onBlur={createProduct.handleBlur}
            options={brands}
          />
          <FormImage
            label="Зображення"
            name="image"
            onChange={(event) => {
              createProduct.setFieldValue('image', event.currentTarget.files[0]);
            }}
            onBlur={createProduct.handleBlur}
            error={createProduct.errors.image && createProduct.touched.image}
          />
          <span>назва характеристики</span>
          <Field
            name="infoTitle"
            value={createProduct.values.infoTitle}
            onChange={createProduct.handleChange}
            onBlur={createProduct.handleBlur}
          />
          <span>Опис характеристики</span>
          <Field
            name="infoDescription"
            value={createProduct.values.infoDescription}
            onChange={createProduct.handleChange}
            onBlur={createProduct.handleBlur}
          />
          <button onClick={addDesc}>додати опис</button>

          {createProduct.values.infoList && <ul>
            {createProduct.values.infoList.map((info) => <li key={info.id}>
              {info.title} {info.description}
              <button onClick={(e) => {deleteDesk(e, info.id)}}>delete</button>
            </li>)}
          </ul>}
          <Button>Створити товар</Button>
        </Form>
      </Formik>
      {addSuccess && <Success>Товар додано</Success>}
    </Container>
  </div>
}

export default AddProduct;