import sprite from '../../static/image/sprite.svg';

const Icon = (props) => {
  return  <svg className="icon">
    <use xlinkHref={sprite + '#' + props.name}></use>
  </svg>
}

export default Icon;