const express = require('express');
const app = express();
const db = require('../server/db');

// this is middleware
app.use(express.json());

// get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM restaurants');
    console.log(results);
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

// get one restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  console.log(req.params);

  try {
    const results = await db.query('SELECT * FROM restaurants WHERE id=$1', [
      req.params.id,
    ]);
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

// create a restaurant
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

// update restaurants
app.put('/api/v1/restaurants/:id', async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  try {
    const results = await db.query(
      'UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4',
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

// delete restaurant
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

const port = 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
