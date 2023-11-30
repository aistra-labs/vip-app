// src/redux/reducers.js
import { combineReducers } from 'redux';

// Reducer for user-related actions
const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    // Add more user-related cases if needed
    default:
      return state;
  }
};

// Reducer for expenses-related actions
const expensesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EXPENSES':
      return action.payload;
    // Add more expenses-related cases if needed
    default:
      return state;
  }
};

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
//   user: userReducer,
//   expenses: expensesReducer,
});

export default rootReducer;
