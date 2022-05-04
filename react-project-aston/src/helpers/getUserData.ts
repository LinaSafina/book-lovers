import { RootState } from '../types/types';

const getUserData = () => {
  try {
    let currentUser = localStorage.getItem('currentUser');
    let history = localStorage.getItem('history');
    let favourites = localStorage.getItem('favourites');
    currentUser = currentUser ? JSON.parse(currentUser) : undefined;

    if (currentUser) {
      const initialUserData = {
        user: { email: currentUser },
        history: history ? JSON.parse(history) : [],
        favourites: favourites ? JSON.parse(favourites) : {},
      };
      return initialUserData;
    } else {
      return { user: null, favourites: {}, history: [] };
    }
  } catch (e) {
    return { user: null, favourites: {}, history: [] };
  }
};

export default getUserData;