const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "geodb",
  password: "admin",
  port: 5432,
});

class Helper {
  constructor() {}
  getData() {
    /** returning data from the db*/
    return pool.connect().then(() => {
      return pool.query("SELECT geometry from tbl_geoJson").then((res) => {
        return res.rows[0].geometry;
      });
    });
  }

  addNewEntry(entry) {
    /** did not work as expected: trying to add a new entry to the JSON field */
    return pool
      .connect()
      .then(() => {
        return pool.query(
          `UPDATE tbl_geoJson SET geometry = geometry :: json || (${JSON.stringify(
            entry
          )}) :: json`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Helper;
