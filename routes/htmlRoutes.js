const path = require("path");

module.exports = function(app) {

    // Home Route
    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    
  };
  