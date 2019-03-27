// Bring in Reqs
const express = require("express");
const multer = require("multer");
const path = require("path");

// Set Multer as Storage Engine
const storage = multer.diskStorage({
    destination: "./public/upload/",
    filename: function(req, file, cb){
        // first parameter of the function is an error and null is supposed to be per docs(14:30)
        // file.fieldname is the name on the input tag on index.html(imageUpload)
        // Date.now() adds a timestamp at the time of upload
        // path ext name will take the original extension and append to the new file name
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname) );
    }
});

// Initialize Upload
const upload = multer({
    storage: storage
}).single("imageUpload");

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

//Router
// require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
