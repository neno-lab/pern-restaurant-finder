import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectRestaurant } from '../redux/actions/restaurantActions';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';

const RestaurantDetailPage = ({ selectedRestaurant, selectRestaurant }) => {
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response);
        selectRestaurant(response.data.data.restaurant);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [id, selectRestaurant]);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <div className='mt-3'>
            <Reviews />
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    selectedRestaurant: state.restaurantReducer.selectedRestaurant,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectRestaurant: bindActionCreators(selectRestaurant, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetailPage);
