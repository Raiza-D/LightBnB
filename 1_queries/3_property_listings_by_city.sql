-- Retrieve Vancouver properties with average rating of 4 stars.
-- Results should show property's id, title, cost per night, and its average rating

SELECT properties.id, title, cost_per_night, AVG(property_reviews.rating) as average_rating
FROM properties
LEFT JOIN property_reviews ON properties.id = property_id
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING AVG(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;
