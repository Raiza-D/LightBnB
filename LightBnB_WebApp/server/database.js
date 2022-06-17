const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
  .query(`SELECT id, name, email, password from users WHERE LOWER(email) = $1`, [email.toLowerCase()])
  .then((result) => {
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query(`SELECT id, name, email FROM users WHERE id = $1`, [id])
  .then((result) => {
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool
  .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [user.name, user.email, user.password])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryAllReservations = `SELECT reservations.*, properties.*, AVG(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;`;

  const allReservationsValues = [guest_id, limit];

  return pool.query(queryAllReservations, allReservationsValues)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];

  /* Use of 'WHERE 1 = 1' ensures WHERE clause always true. That way we have a
  WHERE clause to attach the 'AND' statements. */
  let queryAllProperties = `SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1 = 1
  `;
  
  // If owner_id passed in, only return properties belonging to that owner
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryAllProperties += `AND owner_id = $${queryParams.length} `;
  }

  // If user provides 'city' filter in Search form
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryAllProperties += `AND city LIKE $${queryParams.length} `;
  }

  // If user provides min price filter in Search form
  if (options.minimum_price_per_night) {
    queryParams.push(100 * Number(options.minimum_price_per_night));
    queryAllProperties += `AND cost_per_night >= $${queryParams.length} `;
  }

  // If user provides max price filter in Search form
  if (options.maximum_price_per_night) {
    queryParams.push(100 * Number(options.maximum_price_per_night));
    queryAllProperties += `AND cost_per_night <= $${queryParams.length} `;
  }

  queryAllProperties += `
  GROUP BY properties.id
  `;

  // If user provides min property rating filter in Search form
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryAllProperties += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryAllProperties += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length}`;

  console.log(queryAllProperties, queryParams);

  return pool
    .query(queryAllProperties, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

  const { title, description, owner_id, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code } = property;

  const queryAddProperty = `INSERT INTO properties (title, description, owner_id, cover_photo_url, thumbnail_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, province, city, country, street, post_code) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
  RETURNING *
  `;

  const addPropQueryValues = [
    title,
    description,
    owner_id,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    province,
    city,
    country,
    street,
    post_code,
  ];

  console.log(queryAddProperty, addPropQueryValues)

  return pool
  .query(queryAddProperty, addPropQueryValues)
  .then((result) => {
    console.log(result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message)
  })
}
exports.addProperty = addProperty;
