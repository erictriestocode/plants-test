const path = require("path");
const multer = require("multer");
const Datauri = require("datauri");
const plantId = require("../data/minify");
const identification = require("../data/identification");
const datauri = new Datauri();

let userDataURI;

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
        // res.send("Uploading...");
        upload(req, res, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log(req.file);
                datauri.encode(req.file.path, (err, content) => {
                    if (err) {
                        throw err;
                    }
                
                    // console.log(content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
                    userDataURI = content;
                    // console.log(content);
                    plantId(content);

                    //console.log(this.mimetype); //=> "image/png"
                    //console.log(this.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
                });

            }
        })
    });

};
