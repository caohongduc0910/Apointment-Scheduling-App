import connection from '../../../../config/databaseMySQL.js'

export const indexDashboard = (req, res) => {
  connection.query('SELECT * FROM product_tbl', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  });
  res.send("Dashboard Admin")
}
