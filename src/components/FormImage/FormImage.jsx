import {Field} from 'formik';
import css from './FormImage.module.css';

const FormImage = (props) => {
  const {label, name, onChange, onBlur, error } = props;
  const fileWrapCss = [css.file_wrap]

  if (error) {
    fileWrapCss.push('error')
  }

  return <label className={css.from_image}>
    <span>{label}</span>
    <div className={fileWrapCss.join(' ')}>
      <Field
        name={name}
        type="file"
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  </label>
}

export default FormImage;