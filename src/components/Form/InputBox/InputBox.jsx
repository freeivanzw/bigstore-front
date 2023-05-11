import {Field} from 'formik';
import css from './InputBox.module.css';

const InputBox = (props) => {
  const {label, name, type, value, onChange,onBlur, error} = props;
  return <label className={`${css.input_box} ${error ? css.error : ''}`}>
    <span className={css.input_box_title}>{label}</span>
    <Field
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  </label>
}

export default InputBox;