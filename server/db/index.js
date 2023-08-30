const { Pool } = require("pg");

//Can remove the login info, saved in environmental variables, automatically used
const pool = new Pool();
module.exports = {
    query: (text, params) => pool.query(text, params),
};
 