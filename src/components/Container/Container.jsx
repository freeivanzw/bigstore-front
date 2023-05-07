import css from './Container.module.css';

const Container = (props) => {
  const classList = [css.container, props.className].join(' ')

  return <div className={classList}>
    {props.children}
  </div>
}

export default Container;