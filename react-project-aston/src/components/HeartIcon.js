import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { favouritesActions } from '../store/favourites-slice';
import Icon from './Icon';

const HeartIcon = (props) => {
  const favourites = useSelector((state) => state.favourites.favourites);
  const dispatch = useDispatch();
  const isFavourite = favourites[props.id];
  const heartIconClasses = classNames('heart-icon', { favourite: isFavourite });

  const clickIconHandler = (event) => {
    event.stopPropagation();

    dispatch(favouritesActions.toggleFavourites(props.id));
  };

  return <Icon onIconClick={clickIconHandler} classes={heartIconClasses} />;
};

export default HeartIcon;
