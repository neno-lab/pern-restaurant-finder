import React, { useEffect } from 'react';
import RestaurantFinder from '../api/RestaurantFinder';

const RestaurantsList = () => {
  useEffect(() => {
    // pozovi funkciju gdje cemo pozivati naš api jer useEffect 'ne voli' da mu vracamo promise (a u našem slučaju response vraća promise)
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get('/');
        console.log(response);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

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
          <tr>
            <td>McDonalds</td>
            <td>Split</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className='btn btn-warning'>Update</button>
            </td>
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
          </tr>
          <tr>
            <td>McDonalds</td>
            <td>Split</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className='btn btn-warning'>Update</button>
            </td>
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantsList;
