-- Retrieve Vancouver properties with average rating of 4 stars.
-- Results should show property's id, title, cost per night, and its average rating

SELECT properties.id, title, cost_per_night, AVG(rating) as average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
WHERE city = 'Vancouver' AND property_reviews.rating >= 4
GROUP BY properties.id
ORDER BY cost_per_night
LIMIT 10;
