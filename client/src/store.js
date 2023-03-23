import {createStore} from 'redux';
const cookies = document.cookie.split(';');
let userCookie;
for (let i = 0; i < cookies.length; i++) {
  if (cookies[i].includes('connect.sid=')) {
    console.log('header get cookie: ', cookies[i].trim().substring(12));
    userCookie = cookies[i].trim().substring(12);
  } else {
    console.log('no');
  }
}

const initialState = {
  isLoggedIn: false,
  user: userCookie,
  address: null,
};

export const login = (user, address) => {
  return {
    type: 'LOGIN',
    user: user,
    address: address,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
        address: action.address,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        address: null,
      };
    default:
      return state;
  }
};

const store = createStore(loginReducer);

export default store;
