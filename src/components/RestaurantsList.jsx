import React, { useEffect } from 'react';
import RestaurantFinder from '../api/RestaurantFinder';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  deleteRestaurant,
  loadRestaurants,
} from '../redux/actions/restaurantActions';
import { useHistory } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantsList = ({
  restaurants,
  loadRestaurants,
  deleteRestaurant,
}) => {
  let history = useHistory();

  useEffect(() => {
    // pozovi funkciju gdje cemo pozivati naš api jer useEffect 'ne voli' da mu vracamo promise (a u našem slučaju response vraća promise)
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get('/');
        loadRestaurants(response.data.data.restaurants);
        // console.log('loadRestaurants', response.data.data.restaurants);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, [loadRestaurants]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      console.log(response);
      deleteRestaurant(id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className='text-warning'>0 reviews</span>;
    } else {
      return (
        <>
          <StarRating rating={restaurant.id} />
          <span className='text-warning ml-1'>({restaurant.count})</span>
        </>
      );
    }
  };

  return (
    <div className='list-group'>
      <table className='table table-hover table-dark'>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price Range</th>
            <th scope='col'>Ratings</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => (
              <tr
                onClick={() => handleRestaurantSelect(restaurant.id)}
                key={restaurant.id}
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{'$'.repeat(restaurant.price_range)}</td>
                <td>{renderRating(restaurant)}</td>
                <td>
                  <button
                    onClick={(e) => handleUpdate(e, restaurant.id)}
                    className='btn btn-warning'
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => handleDelete(e, restaurant.id)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log('mapStateToProps', state.restaurantReducer.restaurants);
  return {
    restaurants: state.restaurantReducer.restaurants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRestaurants: bindActionCreators(loadRestaurants, dispatch),
    deleteRestaurant: bindActionCreators(deleteRestaurant, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsList);
