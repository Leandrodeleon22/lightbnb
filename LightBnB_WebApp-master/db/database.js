const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "lightbnb",
});

const getUserWithEmail = function (email) {
  // let resolvedUser = null;
  // for (const userId in users) {
  //   const user = users[userId];
  //   if (user && user.email.toLowerCase() === email.toLowerCase()) {
  //     resolvedUser = user;
  //   }
  // }
  // console.log(Promise.resolve(resolvedUser));
  const resolvedUser = pool
    .query(
      `SELECT * FROM users
       WHERE email = $1
  `,
      [email]
    )
    .then((response) => {
      const user = response.rows[0];
      // console.log(user);
      if (!user) return null;

      return Promise.resolve(user);
    })
    .catch((error) => {
      console.log(error);
    });

  return resolvedUser;
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const result = pool
    .query(
      `SELECT * FROM users
     WHERE id = $1
`,
      [id]
    )
    .then((response) => {
      const user = response.rows[0];
      // console.log(user);
      if (!user) return null;
      // console.log(response.rows[0]);
      return user;
    })
    .catch((error) => {
      console.log(error);
    });

  return result;

  // return Promise.resolve(users[id]);
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // console.log(userId);

  const { name, email, password } = user;
  // console.log(name, email, password);
  const result = pool
    .query(
      `INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *
  `,
      [name, email, password]
    )
    .then((response) => {
      const user = response.rows[0];
      console.log(user);
      // if (!user) return null;

      return Promise.resolve(user);
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
  // return Promise.resolve(user);
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const result = pool
    .query(
      `SELECT reservations.* FROM reservations 
    WHERE guest_id  = $1 
    LIMIT $2
`,
      [guest_id, limit]
    )
    .then((response) => {
      const reservations = response.rows[0];
      console.log(reservations);
      // if (!user) return null;

      return Promise.resolve(reservations);
    })
    .catch((error) => {
      console.log(error);
    });

  return result;

  // return getAllProperties(null, 2);
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = [];

  let querString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    querString += `WHERE properties.city LIKE $${queryParams.length}`;
  }
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    querString += `AND properties.owner_id = $${queryParams.length}`;
  }
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    querString += `AND properties.cost_per_night / 100 >= $${queryParams.length} `;
    queryParams.push(options.maximum_price_per_night);
    querString += `AND properties.cost_per_night / 100 <= $${queryParams.length} `;
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    querString += `AND property_reviews.rating >= $${queryParams.length}   `;
  }

  queryParams.push(limit);
  querString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length}
  `;

  console.log(querString, queryParams);

  return pool.query(querString, queryParams).then((res) => res.rows);

  // return pool
  //   .query(`SELECT * FROM properties LIMIT $1`, [limit])
  //   .then((response) => {
  //     return response.rows;
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);

  const {
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
  } = property;
  const result = pool
    .query(
      `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, 
        post_code,
        country,
        parking_spaces,
        number_of_bathrooms,
        number_of_bedrooms) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *
  `,
      [
        owner_id,
        title,
        description,
        thumbnail_photo_url,
        cover_photo_url,
        cost_per_night,
        street,
        city,
        province,
        post_code,
        country,
        parking_spaces,
        number_of_bathrooms,
        number_of_bedrooms,
      ]
    )
    .then((response) => {
      const property = response.rows[0];
      console.log(property);
      // if (!user) return null;

      return Promise.resolve(property);
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
