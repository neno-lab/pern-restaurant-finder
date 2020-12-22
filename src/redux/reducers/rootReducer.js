import { combineReducers } from 'redux';
import { restaurantReducer } from './restaurantReducer';

const rootReducer = combineReducers({
  restaurantReducer: restaurantReducer,
});

export default rootReducer;
