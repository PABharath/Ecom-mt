import { combineReducers } from 'redux';
import cartReducer from './path/to/your/cartReducer'; // Import your cartReducer (provide the correct path)
import authReducer from './path/to/your/authReducer'; // Import your authReducer (provide the correct path)

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  // Add more reducers if you have them.
});

export default rootReducer;
