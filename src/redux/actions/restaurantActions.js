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
  HANDLE_NAME_REVIEW,
  HANDLE_REVIEW_TEXT_REVIEW,
  HANDLE_RATING_REVIEW,
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

export const handleNameEdit = (props) => {
  return {
    type: HANDLE_NAME_EDIT,
    payload: props,
  };
};

export const handleLocationEdit = (props) => {
  return {
    type: HANDLE_LOCATION_EDIT,
    payload: props,
  };
};

export const handlePriceRangeEdit = (props) => {
  return {
    type: HANDLE_PRICE_RANGE_EDIT,
    payload: props,
  };
};

export const editRestaurant = (restaurant) => {
  return {
    type: EDIT_RESTAURANT,
    payload: restaurant,
  };
};

export const updateRestaurant = (restaurant) => {
  return {
    type: UPDATE_RESTAURANT,
    payload: restaurant,
  };
};

export const selectRestaurant = (restaurant) => {
  console.log('moja akcija', restaurant);
  return {
    type: SELECT_RESTAURANT,
    payload: restaurant,
  };
};

export const handleNameReview = (props) => {
  return {
    type: HANDLE_NAME_REVIEW,
    payload: props,
  };
};

export const handleReviewTextReview = (props) => {
  return {
    type: HANDLE_REVIEW_TEXT_REVIEW,
    payload: props,
  };
};

export const handleRatingReview = (props) => {
  return {
    type: HANDLE_RATING_REVIEW,
    payload: props,
  };
};
