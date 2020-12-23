import {
  CREATE_NEW_RESTAURANT,
  DELETE_RESTAURANT,
  HANDLE_LOCATION_PROPS,
  HANDLE_NAME_PROPS,
  HANDLE_PRICE_RANGE_PROPS,
  LOAD_RESTAURANTS,
} from './restaurantTypes';

export const loadRestaurants = (restaurants) => {
  return {
    type: LOAD_RESTAURANTS,
    payload: restaurants,
  };
};

export const handleNameProps = (props) => {
  return {
    type: HANDLE_NAME_PROPS,
    payload: props,
  };
};

export const handleLocationProps = (props) => {
  return {
    type: HANDLE_LOCATION_PROPS,
    payload: props,
  };
};

export const handlePriceRangeProps = (props) => {
  return {
    type: HANDLE_PRICE_RANGE_PROPS,
    payload: props,
  };
};

export const createNewRestaurant = (restaurant) => {
  console.log('restaurantAkcija', restaurant);
  return {
    type: CREATE_NEW_RESTAURANT,
    payload: restaurant,
  };
};

export const deleteRestaurant = (id) => {
  console.log('id', id);
  return {
    type: DELETE_RESTAURANT,
    payload: id,
  };
};
