const saveUserData = (store: any) => (next: any) => (action: any) => {
  switch (action.type) {
    case 'user/logout': {
      const savedStore = localStorage.getItem('store');
      const parsedSavedStore = savedStore ? JSON.parse(savedStore) : {};
      const userData = store.getState();
      parsedSavedStore[userData.user.email] = {
        user: userData.user,
        history: userData.history,
        favourites: userData.favourites,
      };

      localStorage.setItem('store', JSON.stringify(parsedSavedStore));
      localStorage.removeItem('currentUser');
      localStorage.removeItem('history');
      localStorage.removeItem('favourites');

      let result = next(action);

      return result;
    }

    case 'user/login': {
      const savedStore = localStorage.getItem('store');
      const parsedSavedStore = savedStore ? JSON.parse(savedStore) : {};
      const userData = parsedSavedStore[action.payload];
      const history = JSON.stringify(userData.history);
      const favourites = JSON.stringify(userData.favourites);

      if (userData) {
        localStorage.setItem('currentUser', JSON.stringify(userData.user));
        history && localStorage.setItem('history', history);
        favourites && localStorage.setItem('favourites', favourites);
      } else {
        alert('We could not find your email. Please, Sign Up.');

        let result = next({
          type: 'user/login',
          payload: {
            error: true,
          },
        });

        return result;
      }
      break;
    }

    case 'user/signup': {
      const savedStore = localStorage.getItem('store');
      const parsedSavedStore = savedStore ? JSON.parse(savedStore) : {};
      const userData = parsedSavedStore[action.payload];

      if (userData) {
        alert('This email already exists. Please, Sign In.');

        let result = next({
          type: 'user/signup',
          payload: {
            error: true,
          },
        });

        return result;
      } else {
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
        parsedSavedStore[action.payload] = { user: { email: action.payload } };
        localStorage.setItem('store', JSON.stringify(parsedSavedStore));
      }

      break;
    }

    default:
      break;
  }
  let result = next(action);

  switch (action.type) {
    case 'history/add': {
      const { history } = store.getState();
      localStorage.setItem('history', JSON.stringify(history));
      break;
    }

    case 'history/deleteAll': {
      localStorage.removeItem('history');
      break;
    }

    case 'favourites/toggleFavourites': {
      const { favourites } = store.getState();
      localStorage.setItem('favourites', JSON.stringify(favourites));

      break;
    }

    case 'favourites/deleteAll': {
      localStorage.removeItem('favourites');
      break;
    }

    default:
      break;
  }
  return result;
};

export default saveUserData;
