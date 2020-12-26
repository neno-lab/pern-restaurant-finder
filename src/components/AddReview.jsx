import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
        <button className='btn btn-primary'>Submit</button>
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
