import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { favouritesActions } from '../store/favourites-slice';
import Icon from './Icon';

const HeartIcon = (props) => {
  const navigate = useNavigate();
  const favourites = useSelector((state) => state.favourites);
  const {email:user} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {id} = props;
  const isFavourite = favourites[id];
  const heartIconClasses = classNames('heart-icon', { favourite: isFavourite });

  const clickIconHandler = (event) => {
    event.stopPropagation();
    if (!user) {
      navigate('/signin');
    } else {
      dispatch(favouritesActions.toggleFavourites(id));
    }
  };

  return <Icon onIconClick={clickIconHandler} classes={heartIconClasses} />;
};

export default HeartIcon;
