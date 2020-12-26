import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import RestaurantFinder from '../api/RestaurantFinder';
import {
  handleNameReview,
  handleRatingReview,
  handleReviewTextReview,
} from '../redux/actions/restaurantActions';

const AddReview = ({
  reviews,
  handleNameReview,
  handleReviewTextReview,
  handleRatingReview,
}) => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`${id}/addReview`, {
        name: reviews.name,
        review: reviews.reviewText,
        rating: reviews.rating,
      });
      console.log(response);
      // ovo je hack!!!
      history.push('/');
      history.push(location.pathname);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='mb-2'>
      <form>
        <div className='form-row'>
          <div className='form-group col-8'>
            <label htmlFor='name'>Name</label>
            <input
              value={reviews.name}
              onChange={(e) => handleNameReview(e.target.value)}
              id='name'
              placeholder='name'
              type='text'
              className='form-control'
            />
          </div>
          <div className='form-group col-4'>
            <label htmlFor='rating'>Rating</label>
            <select
              value={reviews.rating}
              onChange={(e) => handleRatingReview(e.target.value)}
              id='rating'
              className='custom-select'
            >
              <option disabled>Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='review'>Review</label>
          <textarea
            value={reviews.reviewText}
            onChange={(e) => handleReviewTextReview(e.target.value)}
            id='review'
            className='form-control'
          ></textarea>
        </div>
        <button
          type='submit'
          onClick={handleSubmitReview}
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    reviews: state.restaurantReducer.reviews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleNameReview: bindActionCreators(handleNameReview, dispatch),
    handleReviewTextReview: bindActionCreators(
      handleReviewTextReview,
      dispatch
    ),
    handleRatingReview: bindActionCreators(handleRatingReview, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
