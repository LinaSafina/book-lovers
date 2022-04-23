import { useSelector, useDispatch } from 'react-redux';

import { favouritesActions } from '../store/favourites-slice';
import Icon from './Icon';

const HeartIcon = (props) => {
  const favourites = useSelector((state) => state.favourites.favourites);
  const dispatch = useDispatch();

  const isFavourite = favourites.find((item) => item.id === props.book.id);
  const heartIconClasses = `heart-icon ${isFavourite ? 'favourite' : ''}`;

  const clickIconHandler = (event) => {
    console.log('click');
    event.stopPropagation();
    if (isFavourite) {
      dispatch(favouritesActions.removeFavourite(props.book.id));
      return;
    } else {
      dispatch(favouritesActions.addFavourite(props.book));
      return;
    }
  };

  return (
    <Icon
      id={props.book.id}
      onIconClick={clickIconHandler}
      classes={heartIconClasses}
    />
  );
};

export default HeartIcon;
