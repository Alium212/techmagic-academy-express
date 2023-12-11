const { body } = require('express-validator');

const validateUser = [
    body("firstName").notEmpty(),
    body("lastName").notEmpty(),
    body("email").isEmail(),
    body("password").notEmpty(),
    body("age").isInt({ min: 0 }),
    body("address").notEmpty(),
    body("createdAt").isISO8601().toDate(),
    body("tags").isArray(),
];

module.exports = validateUser;