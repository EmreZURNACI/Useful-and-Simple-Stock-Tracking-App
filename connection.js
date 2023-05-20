var mysql = require("mysql");
var baglanti = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

baglanti.connect(function (err) {
    if (err) throw err;
});