import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createNewRestaurant,
  handleLocationProps,
  handleNameProps,
  handlePriceRangeProps,
} from '../redux/actions/restaurantActions';
import RestaurantFinder from '../api/RestaurantFinder';

const AddRestaurants = ({
  properties,
  handleNameProps,
  handleLocationProps,
  handlePriceRangeProps,
  createNewRestaurant,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post('/', {
        name: properties.name,
        location: properties.location,
        price_range: properties.priceRange,
      });
      // console.log('moj response', response);
      // console.log('moj response', response.data.data.restaurant);
      createNewRestaurant(response.data.data.restaurant);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='mb-4'>
      <form>
        <div className='form-row'>
          <div className='col'>
            <input
              value={properties.name}
              onChange={(e) => handleNameProps(e.target.value)}
              type='text'
              className='form-control'
              placeholder='Name'
            />
          </div>
          <div className='col'>
            <input
              onChange={(e) => handleLocationProps(e.target.value)}
              value={properties.location}
              type='text'
              className='form-control'
              placeholder='Location'
            />
          </div>
          <div className='col'>
            <select
              onChange={(e) => handlePriceRangeProps(e.target.value)}
              value={properties.priceRange}
              className='custom-select my-1 mr-sm-2'
            >
              <option disabled>Price Range</option>
              <option value='1'>$</option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type='submit'
            className='btn btn-primary'
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  // console.log('mapStateToProps', state.restaurantReducer.properties);
  return {
    properties: state.restaurantReducer.properties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleNameProps: bindActionCreators(handleNameProps, dispatch),
    handleLocationProps: bindActionCreators(handleLocationProps, dispatch),
    handlePriceRangeProps: bindActionCreators(handlePriceRangeProps, dispatch),
    createNewRestaurant: bindActionCreators(createNewRestaurant, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurants);
