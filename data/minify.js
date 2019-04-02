var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var idConfirmation = require("./identification");
// var xhr = new XMLHttpRequest();
// var path = require("path");

var plantApiKey = "uE6x4WzpWVPnWwBZqpVSneRhhl9y7gwe3hRB8qfUt5wpVpbDzF"; //needs to be replaced by env variable
var requestId = 126211;
var plantName;

var request = new XMLHttpRequest();
var requestTwo = new XMLHttpRequest();

module.exports = function (dataURI, cb) {

    request.open('POST', 'https://api.plant.id/identify');

    request.setRequestHeader('Content-Type', 'application/json');
    

    request.onreadystatechange = function () {
        
        if (this.readyState === 4) {
            console.log("THis is request one!");
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
            requestId = parseInt(JSON.parse(this.responseText).id);
            console.log(requestId);
            setTimeout(function(){isResults(requestId)}, 2000);
        }
        
    };

    var body = {
        'key': plantApiKey,         // # required - string
        // 'custom_id': 666,               # optional - identifier for your own puprouse
        // 'custom_url': 'https://...',    # optional - backlink, your web representation of this identification
        // 'callback_url': 'https://...',  # optional - callback url, on this url we POST results after identification is completed
        // 'latitude': 11.7,               # optional - flaot
        // 'longitude': 42.5,              # optional - flaot
        // 'parameters': [],               # optional - list of strings - additional parameters have to be allowed by plant.id team 
        // 'date': 1514764800000,          # optional - int, time in milisecond, used to determine week
        // 'week': 17,                     # optional - int, week in year, use this or date (prefered)
        // 'usage_info': false,            # optional - attache info about API usage and limits (see usage_info endpoint below)
        'images': [                    // # required - images in base64 in one of folowing formats
            dataURI //needs to be replaced
        ],
    };

    request.send(JSON.stringify(body));
    
    var isResults = function (idNumber){

        request.abort()
        delete request;
        requestTwo.open('POST', 'https://api.plant.id/check_identifications');
        requestTwo.setRequestHeader('Content-Type', 'application/json');
    
        requestTwo.onreadystatechange = function () {
            if (this.readyState === 4) {
                console.log("THis is request two!");
                console.log(this);
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                console.log('Body:', this.responseText);
                plantName = JSON.parse(this.responseText)[0].suggestions[0].plant.name;
                console.log(plantName);
                cb(plantName);
            }
        };
    
        var bodyTwo = {
            'key': plantApiKey,
            'ids': [idNumber]
        };
    
        requestTwo.send(JSON.stringify(bodyTwo));
    };
   

};





// idResults(requestId);