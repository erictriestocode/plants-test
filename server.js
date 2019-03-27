// Bring in Requirements
const express = require("express");
const multer = require("multer");
const path = require("path");

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Start Server on port env variable or hard port
app.listen(PORT, function(){
    console.log("server started on port: " + PORT);
});

// Router
// require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Exports
// module.exports = upload;
