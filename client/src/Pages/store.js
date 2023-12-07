import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './path/to/cartReducer';
import authReducer from './path/to/authReducer';

const rootReducer = combineReducers({
  carts: cartReducer,
  auth: authReducer,
  // Add other reducers here if needed
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
