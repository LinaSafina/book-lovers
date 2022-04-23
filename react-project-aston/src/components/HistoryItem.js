const HistoryItem = (props) => {
  return (
    <li className='history-item' onClick={props.onClick}>
      <div>
        Search: <span className='bold'>{props.data.search || 'all'}</span>
      </div>
      <div>
        Language: <span className='bold'>{props.data.languages || 'all'}</span>
      </div>
      <div>
        Copyright: <span className='bold'>{props.data.copyright || 'all'}</span>
      </div>
    </li>
  );
};

export default HistoryItem;
