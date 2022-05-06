import { Props } from '../../types/types';

const Wrapper: React.FC<Props> = (props) => {
  return <div className='wrapper'>{props.children}</div>;
};

export default Wrapper;
