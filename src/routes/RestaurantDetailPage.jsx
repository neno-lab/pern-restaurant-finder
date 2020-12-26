import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../api/RestaurantFinder';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectRestaurant } from '../redux/actions/restaurantActions';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const RestaurantDetailPage = ({ selectedRestaurant, selectRestaurant }) => {
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log('odiiii', response.data.data);
        selectRestaurant(response.data.data);
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
          <h1 className='text-center display-1'>
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className='mt-3'>
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
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
