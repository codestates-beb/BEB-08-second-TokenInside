import {createStore} from 'redux';

const initialState = {
  isLoggedIn: false,
  user: null,
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
