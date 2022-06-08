-- Retrieve details about a single user. Use 'tristanjacobs@gmail.com'.
SELECT id, name, email, password
FROM users
WHERE email = 'tristanjacobs@gmail.com';