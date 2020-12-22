import {
  HANDLE_LOCATION_PROPS,
  HANDLE_NAME_PROPS,
  HANDLE_PRICE_RANGE_PROPS,
  LOAD_RESTAURANTS,
} from '../actions/restaurantTypes';

const initialState = {
  restaurants: [],
  properties: {
    name: '',
    location: '',
    priceRange: 'Price Range',
  },
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RESTAURANTS:
      // console.log('akcija', action.payload);
      return {
        ...state,
        restaurants: action.payload,
      };
    case HANDLE_NAME_PROPS:
      console.log(action.payload);
      return {
        ...state,
        properties: {
          ...state.properties,
          name: action.payload,
        },
      };
    case HANDLE_LOCATION_PROPS:
      return {
        ...state,
        properties: {
          ...state.properties,
          location: action.payload,
        },
      };
    case HANDLE_PRICE_RANGE_PROPS:
      return {
        ...state,
        properties: {
          ...state.properties,
          priceRange: action.payload,
        },
      };
    default:
      return state;
  }
};

export { restaurantReducer };
