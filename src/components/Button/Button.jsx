import css from './Button.module.css';

const Button = (props) => {
  const {onClick, onSubmit} = props;

  return <button
    onClick={onClick}
    onSubmit={onSubmit}
    className={css.btn}
  >
    {props.children}
  </button>
}

export default Button;