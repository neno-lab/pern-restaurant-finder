const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../server/db');

// this is middleware
app.use(cors());
app.use(express.json());

// GET ALL RESTAURANTS
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    // const results = await db.query('SELECT * FROM restaurants');
    const restaurantRatingsData = await db.query(
      'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;'
    );
    // console.log('results', results);
    console.log('restaurantRatingsData', restaurantRatingsData);
    res.status(200).json({
      status: 'success',
      // results: results.rows.length,
      results: restaurantRatingsData.rows.length,
      data: {
        // restaurants: results.rows,
        restaurants: restaurantRatingsData.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// GET ONE RESTAURANT
app.get('/api/v1/restaurants/:id', async (req, res) => {
  console.log(req.params);

  try {
    // const restaurant = await db.query('SELECT * FROM restaurants WHERE id=$1', [
    //   req.params.id,
    // ]);
    const restaurant = await db.query(
      'SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1',
      [req.params.id]
    );
    console.log(restaurant);

    const reviews = await db.query(
      'SELECT * FROM reviews WHERE restaurant_id=$1',
      [req.params.id]
    ); //mogli smo napravit i novu rutu za ovo ali nije bilo potribe jer kada getamo restoran, zelimo getati i recenzije

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// CREATE A RESTAURANT
app.post('/api/v1/restaurants', async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      'INSERT INTO restaurants (name,location,price_range) values($1, $2, $3) returning *',
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// UPDATE RESTAURANTS
app.put('/api/v1/restaurants/:id', async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  try {
    const results = await db.query(
      'UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 returning *',
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    console.log(results);
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE RESTAURANT
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const results = await db.query('DELETE FROM restaurants WHERE id=$1', [
      req.params.id,
    ]);
    console.log(results);

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err.message);
  }
});

// CREATE A REVIEW
app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
  console.log(req);
  try {
    const newReview = await db.query(
      'INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *',
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);

    res.status(201).json({
      status: 'success',
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
