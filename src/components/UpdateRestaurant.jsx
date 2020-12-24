import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  editRestaurant,
  handleLocationEdit,
  handleNameEdit,
  handlePriceRangeEdit,
  updateRestaurant,
} from '../redux/actions/restaurantActions';
import RestaurantFinder from '../api/RestaurantFinder';
import { useHistory } from 'react-router-dom';

const UpdateRestaurant = ({
  properties,
  handleNameEdit,
  handleLocationEdit,
  handlePriceRangeEdit,
  editRestaurant,
  updateRestaurant,
}) => {
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response);
        editRestaurant(response.data.data.restaurant);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, [id, editRestaurant]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.put(`/${id}`, {
        name: properties.name,
        location: properties.location,
        price_range: properties.priceRange,
      });
      console.log(response);
      updateRestaurant(response.data.data.restaurant);
      history.push('/');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            value={properties.name}
            onChange={(e) => handleNameEdit(e.target.value)}
            id='name'
            className='form-control'
            type='text'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <input
            value={properties.location}
            onChange={(e) => handleLocationEdit(e.target.value)}
            id='location'
            className='form-control'
            type='text'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='price_range'>Price Range</label>
          <input
            value={properties.priceRange}
            onChange={(e) => handlePriceRangeEdit(e.target.value)}
            id='price_range'
            className='form-control'
            type='number'
          />
        </div>

        <button
          onClick={handleSubmit}
          type='submit'
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log('moji props: ', state.restaurantReducer.properties);
  return {
    properties: state.restaurantReducer.properties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleNameEdit: bindActionCreators(handleNameEdit, dispatch),
    handleLocationEdit: bindActionCreators(handleLocationEdit, dispatch),
    handlePriceRangeEdit: bindActionCreators(handlePriceRangeEdit, dispatch),
    editRestaurant: bindActionCreators(editRestaurant, dispatch),
    updateRestaurant: bindActionCreators(updateRestaurant, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRestaurant);
