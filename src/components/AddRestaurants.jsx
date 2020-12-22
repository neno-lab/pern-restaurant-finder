import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  handleLocationProps,
  handleNameProps,
  handlePriceRangeProps,
} from '../redux/actions/restaurantActions';

const AddRestaurants = ({
  properties,
  handleNameProps,
  handleLocationProps,
  handlePriceRangeProps,
}) => {
  // console.log('object');
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
          <button className='btn btn-primary'>Add</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps', state.restaurantReducer.properties);
  return {
    properties: state.restaurantReducer.properties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleNameProps: bindActionCreators(handleNameProps, dispatch),
    handleLocationProps: bindActionCreators(handleLocationProps, dispatch),
    handlePriceRangeProps: bindActionCreators(handlePriceRangeProps, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurants);
