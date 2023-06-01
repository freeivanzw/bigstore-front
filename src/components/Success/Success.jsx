import css from './Success.module.css';

const Success = (props) => {
  const {children} = props;
  return <div className={css.success}>
    <b>&#9787;</b>
    <span>{children}</span>
  </div>
}

export default Success;