import {
  CREATE_NEW_RESTAURANT,
  DELETE_RESTAURANT,
  HANDLE_NAME_EDIT,
  HANDLE_LOCATION_PROPS,
  HANDLE_NAME_PROPS,
  HANDLE_PRICE_RANGE_PROPS,
  LOAD_RESTAURANTS,
  HANDLE_LOCATION_EDIT,
  HANDLE_PRICE_RANGE_EDIT,
  EDIT_RESTAURANT,
  UPDATE_RESTAURANT,
  SELECT_RESTAURANT,
} from '../actions/restaurantTypes';

const initialState = {
  restaurants: [],
  properties: {
    name: '',
    location: '',
    priceRange: 'Price Range',
  },
  selectedRestaurant: '',
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RESTAURANTS:
      console.log('akcija', action.payload);
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

    case CREATE_NEW_RESTAURANT:
      console.log('create', action.payload);
      return {
        ...state,
        properties: {
          name: '',
          location: '',
          priceRange: 'Price Range',
        },
        restaurants: [...state.restaurants, action.payload],
      };

    case DELETE_RESTAURANT:
      console.log(action.payload);
      return {
        ...state,
        restaurants: state.restaurants.filter(
          (restaurant) => restaurant.id !== action.payload
        ),
      };

    case HANDLE_NAME_EDIT:
      console.log('HANDLE_NAME_EDIT: ', action.payload);
      return {
        ...state,
        properties: {
          ...state.properties,
          name: action.payload,
        },
      };

    case HANDLE_LOCATION_EDIT:
      console.log('HANDLE_LOCATION_EDIT: ', action.payload);
      return {
        ...state,
        properties: {
          ...state.properties,
          location: action.payload,
        },
      };

    case HANDLE_PRICE_RANGE_EDIT:
      console.log('HANDLE_PRICE_RANGE_EDIT: ', action.payload);
      return {
        ...state,
        properties: {
          ...state.properties,
          priceRange: action.payload,
        },
      };

    case EDIT_RESTAURANT:
      console.log('edit akcija: ', action.payload);
      return {
        ...state,
        properties: {
          name: action.payload.name,
          location: action.payload.location,
          priceRange: action.payload.price_range,
        },
      };

    case UPDATE_RESTAURANT:
      return {
        ...state,
        properties: {
          name: '',
          location: '',
          priceRange: 'Price Range',
        },
        restaurants: state.restaurants.map((restaurant) =>
          restaurant.id !== action.payload.id ? restaurant : action.payload
        ),
      };

    case SELECT_RESTAURANT:
      console.log('reducer', action.payload);
      return {
        ...state,
        selectedRestaurant: action.payload,
      };

    default:
      return state;
  }
};

export { restaurantReducer };
