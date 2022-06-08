-- Calculate average length of reservations (avg num of days guests stay)
SELECT AVG(end_date - start_date) as average_duration
FROM reservations;