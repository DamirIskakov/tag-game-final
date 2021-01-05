import classes from './Item.module.sass';

const Item = (props) => {
  const { value, moveHandler } = props;
  const style = value ? {} : { border: 'none', backgroundColor: 'unset' };
  return (
    <div style={style} className={classes.Item} onClick={moveHandler}>
      {value}
    </div>
  );
};

export default Item;
