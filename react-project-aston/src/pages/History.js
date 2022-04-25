import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HistoryItem from '../components/HistoryItem';
import Wrapper from '../components/Layout/Wrapper';
import { historyActions } from '../store/history-slice';

const History = () => {
  const navigate = useNavigate();
  const history = useSelector((state) => state.history.history);

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
        data={item}
        key={Math.random().toString()}
        onClick={clickItemHandler}
      />
    );
  });

  const dispatch = useDispatch();
  const clearHistoryHandler = () => {
    dispatch(historyActions.deleteAll());
  };

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
