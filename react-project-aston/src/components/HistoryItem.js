import searchAll from '../constants/searchAll';

const HistoryItem = (props) => {
  return (
    <li className='history-item' onClick={props.onClick}>
      <div>
        Search: <span className='bold'>{props.data.search || searchAll}</span>
      </div>
      <div>
        Language: <span className='bold'>{props.data.languages || searchAll}</span>
      </div>
      <div>
        Copyright: <span className='bold'>{props.data.copyright || searchAll}</span>
      </div>
    </li>
  );
};

export default HistoryItem;
