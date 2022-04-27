const getUserData = () => {
  try {
    let currentUser = localStorage.getItem('currentUser');
    let history = localStorage.getItem('history');
    let favourites = localStorage.getItem('favourites');
    currentUser = currentUser ? JSON.parse(currentUser) : undefined;

    if (currentUser) {
      console.log(currentUser);
      return {
        user: { email: currentUser },
        history: JSON.parse(history) || [],
        favourites: JSON.parse(favourites) || {},
      };
    }
  } catch (e) {
    return undefined;
  }
};

export default getUserData;
