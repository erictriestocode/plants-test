const path = require("path");
const multer = require("multer");
// const upload = require("upload");

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
    storage: storage,
    limits:{fileSize: 1000000}, // limit to 1 MB
}).single("imageUpload");

module.exports = function (app) {

    // Home Route
    app.get("/", function (req, res) {
        console.log("Index loaded!")
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // Image Upload Route
    app.post("/upload", function (req, res) {
        res.send("Uploading...");
        upload(req, res, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log(req.file);
            }
        })
    });

};
