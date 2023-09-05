SELECT * FROM restaurants 
    LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating 
    FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id 
    ORDER BY id;