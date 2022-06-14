let properties = {};
const users = require('./json/users.json');
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
  .query(`SELECT id, name, email, password from users WHERE email = $1`, [email])
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

  const allReservationsValues = [guest_id, 10];

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

  let queryAllProperties = `SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // If owner_id passed in, only return properties belonging to that owner
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryAllProperties += `WHERE owner_id = $${queryParams.length} `;
  }
  
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryAllProperties += `WHERE city LIKE $${queryParams.length} `;
  }
  
  if (options.minimum_price_per_night) {
    queryParams.push(100 * Number(options.minimum_price_per_night));
    queryAllProperties += `AND cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(100 * Number(options.maximum_price_per_night));
    queryAllProperties += `AND cost_per_night <= $${queryParams.length} `;
  }
/*
  if (options.minimum_rating) {
    queryParams.push(`%${options.minimum_rating}%`);
    queryAllProperties += `AND average_rating >= $${queryParams.length}`;
  } */

  queryParams.push(limit);
  queryAllProperties += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length}`;

  console.log(queryAllProperties, queryParams);

  return pool
  .query(queryAllProperties, queryParams)
  .then((result) => {
    // console.log(result.rows);
    // properties = result.rows;
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });


  // WHERE city LIKE '%ancouv%'
  // GROUP BY properties.id
  // HAVING avg(property_reviews.rating) >= 4
  // ORDER BY cost_per_night
  // LIMIT 10;`;

}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
