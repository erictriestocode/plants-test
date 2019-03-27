const path = require("path");
const upload = require("upload");

module.exports = function(app) {

    // Home Route
    app.get("/", function(req,res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    
    // Image Upload Route
    app.post("/upload", function(req,res){
        res.send("test");
        upload(req,res, function(err){
            if(err){
                alert(err)
            } else{
                console.log(req.file);
                res.send("test");
            }
        })
    });

  };
  