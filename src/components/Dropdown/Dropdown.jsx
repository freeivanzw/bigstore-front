import css from './Dropdown.module.css';
import {Field} from 'formik';

const Dropdown = (props) => {
  const { label, name, value, onChange, onBlur, options } = props;
  return <label className={css.dropdown}>
    <span>{label}</span>
    <Field
      as="select"
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
      <option style={{display: "none"}}>Виберіть</option>
      {options.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
    </Field>
  </label>
}

export default Dropdown;