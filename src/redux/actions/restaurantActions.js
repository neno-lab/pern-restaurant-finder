import {
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
