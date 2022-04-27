const saveUserData = (store) => (next) => (action) => {
  console.log(action);
  function logoutActionCreator() {
    return (dispatch) => {
      dispatch({ type: 'user/logout' });
      dispatch({ type: 'history/deleteAll' });
      dispatch({ type: 'favourites/deleteAll' });
    };
  }

  switch (action.type) {
    case 'user/logout': {
      try {
        let savedStore = localStorage.getItem('store');
        savedStore = savedStore ? JSON.parse(savedStore) : {}; //{user: {email:'', history: [], favourites: {}}}

        let userData = store.getState(); //{user:{email:''}, history: {history:[]}, favourites:{}}
        console.log(userData.user);
        savedStore[userData.user.email] = {
          email: userData.user.email,
          history: userData.history,
          favourites: userData.favourites,
        };

        localStorage.setItem('store', JSON.stringify(savedStore));

        localStorage.removeItem('currentUser');
        localStorage.removeItem('history');
        localStorage.removeItem('favourites');
        let result = next(logoutActionCreator());
        return result;
      } catch (e) {
        console.log(e.message);
      }
      break;
    }

    case 'user/login': {
      try {
        let savedStore = localStorage.getItem('store');
        savedStore = savedStore ? JSON.parse(savedStore) : {};
        let userData = savedStore[action.payload];

        if (userData) {
          localStorage.setItem('currentUser', JSON.stringify(userData.user));
          localStorage.setItem('history', JSON.stringify(userData.history));
          localStorage.setItem(
            'favourites',
            JSON.stringify(userData.favourites)
          );
        } else {
          alert('We could not find your email. Please, Sign Up.');
          let result = next({
            type: 'user/login',
            payload: {
              error: true,
            },
          });
          console.log(result);
          return result;
        }
      } catch (e) {
        console.log(e.message);
      }
      break;
    }

    case 'user/signup': {
      try {
        let savedStore = localStorage.getItem('store');
        savedStore = savedStore ? JSON.parse(savedStore) : {};
        let userData = savedStore[action.payload];

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
          savedStore[action.payload] = { user: { email: action.payload } };
          localStorage.setItem('store', JSON.stringify(savedStore));
        }
      } catch (e) {
        console.log(e.message);
      }
      break;
    }

    default:
      console.log('default');
  }
  let result = next(action);

  switch (action.type) {
    case 'history/add': {
      try {
        const { history } = store.getState();
        localStorage.setItem('history', JSON.stringify(history));
      } catch (e) {
        console.log(e.message);
      }
      break;
    }

    case 'favourites/toggleFavourites': {
      try {
        const { favourites } = store.getState();
        localStorage.setItem('favourites', JSON.stringify(favourites));
      } catch (e) {
        console.log(e.message);
      }
      break;
    }

    default:
      console.log('default');
  }
  console.log(result);
  return result;
};

export default saveUserData;
