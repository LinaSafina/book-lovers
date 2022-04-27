import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import HistoryItem from '../components/HistoryItem';
import Wrapper from '../components/Layout/Wrapper';
import { historyActions } from '../store/history-slice';

const History = () => {
  const navigate = useNavigate();
  const history = useSelector((state) => state.history);
  const { email: user } = useSelector((state) => state.user);

  const historyList = history.map((item) => {
    const clickItemHandler = () => {
      navigate(
        `/search?search=${item.search || 'all'}&copyright=${
          item.copyright || 'all'
        }&languages=${item.languages || 'all'}&page=1`
      );
    };

    return (
      <HistoryItem
        key={Math.random().toString()}
        data={item}
        onClick={clickItemHandler}
      />
    );
  });

  const dispatch = useDispatch();
  const clearHistoryHandler = () => {
    dispatch(historyActions.deleteAll());
  };

  if (!user) {
    return <Navigate to='/signin' replace />;
  }

  return (
    <Wrapper>
      <div className='history'>
        <button className='button' onClick={clearHistoryHandler}>
          Clear
        </button>
        <ul>{historyList}</ul>
      </div>
    </Wrapper>
  );
};

export default History;
