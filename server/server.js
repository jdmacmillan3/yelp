require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require('morgan');
const app = express();


//define middleware at top becuase code runs top down
//anything you can do in a route handler you can do in middleware
// app.use((req, res, next) => {
// });

//morgan is middleware
// app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {

    try{
        //const results = await db.query("SELECT * FROM restaurants");
        const restaurantRatingsData = await db.query(
            `SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) 
            AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id`
        );
        // console.log("results", results);
        // console.log(`restaurant data`, restaurantRatingsData);
        res.status(200).json({
            status: "success",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurants: restaurantRatingsData.rows,
            }
        });
    } catch (err){
        console.log(err);
    }
});
    

//ht tp://localhost:port/getRestaurants

// Get an individual restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    // console.log(req.params.id);

    try{
        //this is bad, (commented out) need to used paramaterized query, this could lead to attacks
        //node-postgres website
        //const results = await db.query(`SELECT * FROM restaurants where id = ${req.params.id}`);
        const restaurant = await db.query(`SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), 
            TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON 
            restaurants.id = reviews.restaurant_id WHERE id = $1`, [req.params.id]);

        const reviews = await db.query(`SELECT * FROM reviews where restaurant_id = $1`, [req.params.id]);
        // console.log(results.rows[0]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows
            }
        });
    } catch (err){
        console.log(err);
    }
});

//Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    // console.log(req.body);

    try{
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", 
            [req.body.name, req.body.location, req.body.price_range]);
        // console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    } catch (err){
        console.log(err);
    }
});

//Update one individual restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
//    console.log(req.params.id);
//    console.log(req.body);

    try{
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *", 
            [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        // console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    } catch (err){
        console.log(err);
    }
    // console.log(req.params.id);
    // console.log(req.body);
});

//Delete one individual restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) =>{
    try{
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        // console.log(results);
        res.status(204).json({
            status: "success",
        });
    } catch (err){
        console.log(err);
    }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) =>{
    try{
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *", 
            [req.params.id, req.body.name, req.body.review, req.body.rating]);
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0],
            }
        });
    } catch (err){
            console.log(err);
    }
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});
